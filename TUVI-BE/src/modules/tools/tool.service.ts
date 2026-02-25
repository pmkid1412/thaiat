import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ToolInvestmentAdviceRequestDto,
  ToolInvestmentAIAdviceRequestDto,
} from './dto/tool-investment-advice.dto';
import { env } from 'src/config/env.config';
import { UserType } from 'src/common/constants/user.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemConfig } from 'src/database/entities/system-config.entity';
import { Repository } from 'typeorm';
import { SystemConfigCode } from 'src/common/constants/system-config.constant';
import { ValidatorUtil } from 'src/common/utils/validator.util';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import * as fs from 'fs';
import * as path from 'path';
import type { Response } from 'express';
import { ToolMetadata } from 'src/database/entities/tool-metadata.entity';
import { ToolCode } from 'src/common/constants/tool.constant';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';
import { Language } from 'src/database/entities/language.entity';
import { LanguageName } from 'src/common/constants/language.constant';
import { ToolUsage } from 'src/database/entities/tool-usage.entity';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
    @InjectRepository(ToolMetadata)
    private readonly toolMetadataRepository: Repository<ToolMetadata>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(ToolUsage)
    private readonly toolUsageRepository: Repository<ToolUsage>,
  ) { }

  async investmentAdvice(
    dto: ToolInvestmentAdviceRequestDto,
    currentUser: any,
  ) {
    let toolUsage: ToolUsage | null = null;
    if (currentUser.type === UserType.FREE) {
      toolUsage = await this.toolUsageRepository.findOne({
        where: {
          toolCode: ToolCode.INVESTMENT_TOOL,
          user: { id: currentUser.id },
        },
      });
      if (!toolUsage) {
        return {};
      }
      const { usedCount, maxUsage } = toolUsage;
      if (usedCount >= maxUsage) {
        if (usedCount === maxUsage) {
          toolUsage!.usedCount += 1;
          await this.toolUsageRepository.save(toolUsage!);
        }
        const error = ValidatorUtil.addCustomError('maxUsage', {
          isExceed: ErrorResponseMessage.EXCEED_MAX_USAGE,
        });
        throw new BadRequestException({ errors: [error] });
      }
    }

    const endPoint = `${env.TOOLS.INVESTMENT_ADVICE_TOOL_URL}/analyze`;
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...dto, leverage: dto.leverage ? 'yes' : 'no' }),
    });
    console.log('response', response);

    if (!response.ok) {
      throw new InternalServerErrorException('có lỗi đã xảy ra');
    }

    if (currentUser.type === UserType.FREE) {
      toolUsage!.usedCount += 1;
      await this.toolUsageRepository.save(toolUsage!);
    }

    return await response.json();
  }

  async investmentAIAdvice(
    dto: ToolInvestmentAIAdviceRequestDto,
    currentUser: any,
  ) {
    if (currentUser.type === UserType.FREE) {
      const toolUsage = await this.toolUsageRepository.findOne({
        where: {
          toolCode: ToolCode.INVESTMENT_TOOL,
          user: { id: currentUser.id },
        },
      });
      if (!toolUsage) {
        return {};
      }
      const { usedCount, maxUsage } = toolUsage;
      if (usedCount > maxUsage) {
        const error = ValidatorUtil.addCustomError('maxUsage', {
          isExceed: ErrorResponseMessage.EXCEED_MAX_USAGE,
        });
        throw new BadRequestException({ errors: [error] });
      }
    }

    const endPoint = `${env.TOOLS.INVESTMENT_ADVICE_TOOL_URL}/gemini-advice`;
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    console.log('response', response);

    if (!response.ok) {
      throw new InternalServerErrorException('có lỗi đã xảy ra');
    }

    return await response.json();
  }

  getInvestmentToolConfig = async (code: string, res: Response) => {
    const availableCodes: string[] = [
      SystemConfigCode.INVESTMENT_TOOL_BY_HOUR_FILE,
      SystemConfigCode.INVESTMENT_TOOL_BY_DAY_FILE,
      SystemConfigCode.INVESTMENT_TOOL_BY_YEAR_FILE,
      SystemConfigCode.INVESTMENT_TOOL_EVENTS_FILE,
      SystemConfigCode.AI_API_KEY,
    ];

    if (!availableCodes.includes(code)) {
      const validationError = ValidatorUtil.addCustomError('code', {
        isInvalid: ErrorResponseMessage.INVALID_VALUE,
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    const systemConfig = await this.systemConfigRepository.findOne({
      where: { code },
    });

    if (!systemConfig) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    if (code === SystemConfigCode.AI_API_KEY) {
      return systemConfig.value;
    }

    const fileName = systemConfig.value;
    const filePath = path.resolve(__dirname, '../../../', fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const csvText = fs.readFileSync(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    return csvText;
  };

  getInvestmentToolMetadata = async (
    code: string,
    dto: LanguageIdRequestDto,
  ) => {
    const languageId = await this.getDefaultLanguageId(dto.languageId);

    return await this.toolMetadataRepository.find({
      where: { toolCode: ToolCode.INVESTMENT_TOOL, languageId, nameCode: code },
      select: ['metaKey', 'metaValue'],
    });
  };

  private async getDefaultLanguageId(languageId: number | undefined) {
    if (!languageId) {
      const language = await this.languageRepository.findOne({
        where: { name: LanguageName.VIETNAMESE },
      });
      return language?.id;
    }
    return languageId;
  }
}

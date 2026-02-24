import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SystemConfig } from 'src/database/entities/index.entity';
import { ListSystemConfigDto } from './dto/list-system-config.dto';
import { SystemConfigCode } from 'src/common/constants/system-config.constant';
import { UserRole } from 'src/common/constants/user.constant';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { ValidatorUtil } from 'src/common/utils/validator.util';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { env } from 'src/config/env.config';
import * as fs from 'fs';
import * as path from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class SystemConfigService {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
  ) { }

  async findAll(currentUser: any): Promise<ListSystemConfigDto[]> {
    const isAdmin = currentUser.role === UserRole.ADMIN;
    const availableCodes = isAdmin
      ? this.getAdminAvailableCodes()
      : this.getAvailableCodes();
    const configs = await this.systemConfigRepository.find({
      where: { code: In(availableCodes) },
    });

    return configs.map((config) => {
      let value = config.value;
      if (config.isSecure) {
        const valueLength = value.length;
        if (value.length >= 4) {
          value = '*************' + value.substring(valueLength - 4);
        } else {
          value = '*************';
        }
      }

      return {
        code: config.code,
        name: config.name,
        valueType: config.valueType,
        value,
        description: isAdmin ? config.description : null,
      };
    });
  }

  async update(
    code: string,
    dto: UpdateSystemConfigDto,
    file: Express.Multer.File,
    currentUser: any,
  ) {
    const availableCodes = this.getAdminAvailableCodes();
    if (!availableCodes.includes(code)) {
      const error = ValidatorUtil.addCustomError('code', {
        isInvalid: ErrorResponseMessage.INVALID_VALUE,
      });
      throw new BadRequestException({ errors: [error] });
    }

    const stringCodes: string[] = [
      SystemConfigCode.ZALO_NUMBER,
      SystemConfigCode.AI_API_KEY,
      SystemConfigCode.OPENAI_API_KEY,
      SystemConfigCode.AI_PROVIDER_DEFAULT,
    ];
    let value = dto.value;
    if (stringCodes.includes(code)) {
      if (!dto.value) {
        const error = ValidatorUtil.addCustomError('value', {
          isInvalid: ErrorResponseMessage.FIELD_IS_REQUIRED,
        });
        throw new BadRequestException({ errors: [error] });
      }
    } else {
      if (!file) {
        const error = ValidatorUtil.addCustomError('file', {
          isInvalid: ErrorResponseMessage.FIELD_IS_REQUIRED,
        });
        throw new BadRequestException({ errors: [error] });
      }
      value = file.path;
    }

    const systemConfig = await this.systemConfigRepository.findOne({
      where: { code },
    });

    let oldFile = '';
    if (systemConfig) {
      if (systemConfig.valueType === 'file') {
        oldFile = systemConfig.value;
      }
      Object.assign(systemConfig, {
        value,
        lastModifiedBy: currentUser.id,
      });
      await this.systemConfigRepository.save(systemConfig);
    } else {
      const baseConfigData = this.getBaseConfigData(code);
      const newSystemConfig = this.systemConfigRepository.create({
        value,
        code,
        ...baseConfigData,
        lastModifiedBy: currentUser.id,
      });

      await this.systemConfigRepository.save(newSystemConfig);
    }

    if (oldFile) {
      const filePath = path.resolve(__dirname, '../../../', oldFile);
      if (fs.existsSync(filePath)) {
        try {
          await unlink(filePath);
        } catch (error) {
          console.log('error unlink', error);
        }
      }
    }

    const investmentConfigCodes: string[] = [
      SystemConfigCode.INVESTMENT_TOOL_BY_HOUR_FILE,
      SystemConfigCode.INVESTMENT_TOOL_BY_DAY_FILE,
      SystemConfigCode.INVESTMENT_TOOL_BY_YEAR_FILE,
      SystemConfigCode.AI_API_KEY,
    ];
    if (investmentConfigCodes.includes(code)) {
      const endPoint = `${env.TOOLS.INVESTMENT_ADVICE_TOOL_URL}/api/webhook/reload-data`;
      try {
        const response = await fetch(endPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('response', response);
      } catch (error) {
        console.log('Error reload data', error);
      }
    }
  }

  private getAdminAvailableCodes() {
    return [
      SystemConfigCode.ZALO_NUMBER,
      SystemConfigCode.AI_API_KEY,
      SystemConfigCode.OPENAI_API_KEY,
      SystemConfigCode.AI_PROVIDER_DEFAULT,
      SystemConfigCode.INVESTMENT_TOOL_BY_HOUR_FILE,
      SystemConfigCode.INVESTMENT_TOOL_BY_DAY_FILE,
      SystemConfigCode.INVESTMENT_TOOL_BY_YEAR_FILE,
    ];
  }

  private getAvailableCodes() {
    return [SystemConfigCode.ZALO_NUMBER];
  }

  private getBaseConfigData(code: string) {
    const baseConfigData = {
      [SystemConfigCode.ZALO_NUMBER]: {
        name: 'Số điện thoại Zalo',
        valueType: 'string',
        description: 'Số điện thoại Zalo dùng để liên hệ',
      },
      [SystemConfigCode.AI_API_KEY]: {
        name: 'Gemini API Key',
        valueType: 'string',
        description: 'API Key Gemini — AI provider chính',
        isSecure: true,
      },
      [SystemConfigCode.OPENAI_API_KEY]: {
        name: 'OpenAI API Key',
        valueType: 'string',
        description: 'API Key OpenAI — backup khi Gemini gặp lỗi',
        isSecure: true,
      },
      [SystemConfigCode.AI_PROVIDER_DEFAULT]: {
        name: 'AI Provider mặc định',
        valueType: 'string',
        description: 'Provider mặc định: gemini hoặc openai',
      },
      [SystemConfigCode.INVESTMENT_TOOL_BY_HOUR_FILE]: {
        name: 'File ranging theo giờ',
        valueType: 'file',
        description: 'File dùng cho tool đầu tư',
      },
      [SystemConfigCode.INVESTMENT_TOOL_BY_DAY_FILE]: {
        name: 'File ranging theo ngày',
        valueType: 'file',
        description: 'File dùng cho tool đầu tư',
      },
      [SystemConfigCode.INVESTMENT_TOOL_BY_YEAR_FILE]: {
        name: 'File ranging theo năm',
        valueType: 'file',
        description: 'File dùng cho tool đầu tư',
      },
    };

    return baseConfigData[code];
  }
}

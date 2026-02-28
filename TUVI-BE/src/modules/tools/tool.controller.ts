import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ToolService } from './tool.service';
import {
  ToolInvestmentAdviceRequestDto,
  ToolInvestmentAIAdviceRequestDto,
  ToolInvestmentMetadataDto,
} from './dto/tool-investment-advice.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserGuard } from 'src/common/guards/user.guard';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';
import { InternalSecretGuard } from 'src/common/guards/internal-secret.guard';
import type { Response } from 'express';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@ApiBearerAuth()
@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) { }

  @UseGuards(UserGuard)
  @Post('investment/advice')
  @ApiBaseResponse({})
  async investmentAdvice(
    @Body() dto: ToolInvestmentAdviceRequestDto,
    @CurrentUser() currentUser,
  ) {
    return this.toolService.investmentAdvice(dto, currentUser);
  }

  @UseGuards(UserGuard)
  @Post('investment/ai-advice')
  @ApiBaseResponse({})
  async investmentAIAdvice(
    @Req() req: any,
    @CurrentUser() currentUser,
  ) {
    return this.toolService.investmentAIAdvice(req.body, currentUser);
  }

  @UseGuards(InternalSecretGuard)
  @Get('investment/config/:code')
  getInvestmentToolConfig(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.toolService.getInvestmentToolConfig(code, res);
  }

  @UseGuards(UserGuard)
  @Get('investment/metadata/:code')
  @ApiBaseResponse({ model: [ToolInvestmentMetadataDto] })
  getInvestmentToolMetadata(
    @Param('code') code: string,
    @Query() query: LanguageIdRequestDto,
  ) {
    return this.toolService.getInvestmentToolMetadata(code, query);
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/common/decorators/index.decorator';
import { PredictionStatusService } from './prediction-status.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ListPredictionStatusDto } from './dto/list-prediction-status.dto';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@ApiBearerAuth()
@Controller('prediction-status')
export class PredictionStatusController {
  constructor(
    private readonly predictionStatusService: PredictionStatusService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBaseResponse({ model: [ListPredictionStatusDto] })
  findAll(
    @Query() query: LanguageIdRequestDto,
  ): Promise<ListPredictionStatusDto[]> {
    return this.predictionStatusService.findAll(query);
  }
}

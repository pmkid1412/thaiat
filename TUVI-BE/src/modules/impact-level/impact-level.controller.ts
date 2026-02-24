import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/common/decorators/index.decorator';
import { ImpactLevelService } from './impact-level.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ListImpactLevelDto } from './dto/list-impact-level.dto';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@ApiBearerAuth()
@Controller('impact-levels')
export class ImpactLevelController {
  constructor(private readonly impactLevelService: ImpactLevelService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBaseResponse({ model: [ListImpactLevelDto] })
  findAll(@Query() query: LanguageIdRequestDto): Promise<ListImpactLevelDto[]> {
    return this.impactLevelService.findAll(query);
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/common/decorators/index.decorator';
import { AreaService } from './area.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ListAreaDto } from './dto/list-area.dto';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@ApiBearerAuth()
@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBaseResponse({ model: [ListAreaDto] })
  findAll(@Query() query: LanguageIdRequestDto): Promise<ListAreaDto[]> {
    return this.areaService.findAll(query);
  }
}

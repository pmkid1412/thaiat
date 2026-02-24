import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/common/decorators/index.decorator';
import { DomainService } from './domain.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ListDomainDto } from './dto/list-domain.dto';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@ApiBearerAuth()
@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBaseResponse({ model: [ListDomainDto] })
  findAll(@Query() query: LanguageIdRequestDto): Promise<ListDomainDto[]> {
    return this.domainService.findAll(query);
  }
}

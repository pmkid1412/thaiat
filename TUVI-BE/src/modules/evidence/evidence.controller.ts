import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/index.guard';
import {
  ApiBaseResponse,
  CurrentUser,
} from 'src/common/decorators/index.decorator';
import { EvidenceService } from './evidence.service';
import { EvidenceDto, ListEvidenceRequestDto } from './dto/list-evidence.dto';
import { CreateEvidenceRequestDto } from './dto/create-evidence.dto';
import { UpdateEvidenceRequestDto } from './dto/update-evidence.dto';
import { SuccessResponseMessage } from 'src/common/constants/message.constant';

@ApiBearerAuth()
@Controller('evidences')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiBaseResponse({ notFoundError: true, badRequest: true })
  async create(
    @Body() createEvidenceDto: CreateEvidenceRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.evidenceService.create(createEvidenceDto, currentUser);

    return { message: SuccessResponseMessage.DATA_CREATED };
  }

  @UseGuards(AdminGuard)
  @Get()
  @ApiBaseResponse({ model: [EvidenceDto] })
  findAll(@Query() query: ListEvidenceRequestDto): Promise<EvidenceDto[]> {
    return this.evidenceService.findAll(query);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiBaseResponse({ notFoundError: true })
  async destroy(@Param('id') id: number) {
    await this.evidenceService.destroy(id);

    return { message: SuccessResponseMessage.DATA_DELETED };
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiBaseResponse({ model: EvidenceDto, notFoundError: true })
  findOne(@Param('id') id: number) {
    return this.evidenceService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  @ApiBaseResponse({ notFoundError: true, badRequest: true })
  async update(
    @Param('id') id: number,
    @Body() updateEvidenceDto: UpdateEvidenceRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.evidenceService.update(id, updateEvidenceDto, currentUser);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PredictionService } from './prediction.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import {
  ApiBaseResponse,
  CurrentUser,
} from 'src/common/decorators/index.decorator';
import { CreatePredictionRequestDto } from './dto/create-prediction.dto';
import {
  ListBookmarkedPredictionRequestDto,
  ListBookmarkedPredictionResponseDto,
  ListPredictionRequestDto,
  ListPredictionResponseDto,
  ManageListPredictionRequestDto,
  ManageListPredictionResponseDto,
  RecentPrediction,
} from './dto/list-prediction.dto';
import { RetrievePredictionResponseDto } from './dto/retrieve-prediction.dto';
import { UpdatePredictionRequestDto } from './dto/update-prediction.dto';
import { OverviewPredictionResponseDto } from './dto/overview-prediction.dto';
import {
  StatsPredictionByConfidenceItemDto,
  StatsPredictionByDomainItemDto,
  StatsPredictionByStatusItemDto,
} from './dto/stats-prediction.dto';
import { LanguageIdRequestDto } from 'src/common/dtos/index.dto';
import { UserRole, UserType } from 'src/common/constants/user.constant';
import { OptionalJwtAuthGuard } from 'src/common/guards/optional.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserGuard } from 'src/common/guards/user.guard';
import { SuccessResponseMessage } from 'src/common/constants/message.constant';

@ApiBearerAuth()
@Controller('predictions')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) { }

  @UseGuards(AdminGuard)
  @Post()
  @ApiBaseResponse({
    created: true,
    badRequest: true,
  })
  async create(
    @Body() createPredictionDto: CreatePredictionRequestDto,
    @CurrentUser() user,
  ) {
    await this.predictionService.create(createPredictionDto, user);

    return { message: SuccessResponseMessage.DATA_CREATED };
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  @ApiBaseResponse({ model: ListPredictionResponseDto })
  findAll(@Query() query: ListPredictionRequestDto, @CurrentUser() user) {
    return this.predictionService.proGetAll(query, user);
  }

  @UseGuards(AdminGuard)
  @Get('manage')
  @ApiBaseResponse({ model: ManageListPredictionResponseDto })
  manage(@Query() query: ManageListPredictionRequestDto) {
    return this.predictionService.adminGetAll(query);
  }

  @UseGuards(UserGuard)
  @Get('bookmarks')
  @ApiBaseResponse({ model: ListBookmarkedPredictionResponseDto })
  getBookmarks(
    @Query() query: ListBookmarkedPredictionRequestDto,
    @CurrentUser() user,
  ) {
    return this.predictionService.getBookmarkedPredictions(query, user);
  }

  @UseGuards(AdminGuard)
  @Get('overview')
  @ApiBaseResponse({ model: OverviewPredictionResponseDto })
  overview(): Promise<OverviewPredictionResponseDto> {
    return this.predictionService.overview();
  }

  @UseGuards(AdminGuard)
  @Get('recent')
  @ApiBaseResponse({ model: [RecentPrediction] })
  recentPredictions(
    @Query() query: LanguageIdRequestDto,
  ): Promise<RecentPrediction[]> {
    return this.predictionService.recentPredictions(query);
  }

  @UseGuards(AdminGuard)
  @Get('stats/by-domain')
  @ApiBaseResponse({ model: [StatsPredictionByDomainItemDto] })
  getPredictionsByDomains(@Query() query: LanguageIdRequestDto) {
    return this.predictionService.getPredictionsByDomains(query);
  }

  @UseGuards(AdminGuard)
  @Get('stats/by-status')
  @ApiBaseResponse({ model: [StatsPredictionByStatusItemDto] })
  getPredictionsByStatus(@Query() query: LanguageIdRequestDto) {
    return this.predictionService.getPredictionsByStatus(query);
  }

  @UseGuards(AdminGuard)
  @Get('stats/by-confidence')
  @ApiBaseResponse({ model: [StatsPredictionByConfidenceItemDto] })
  getPredictionsByConfidenceRange() {
    return this.predictionService.getPredictionsByConfidenceRange();
  }

  @UseGuards(AdminGuard)
  @Post(':id/generate-teaser')
  @ApiBaseResponse({ notFoundError: true })
  async generateTeaser(@Param('id', ParseIntPipe) id: number) {
    return this.predictionService.generateTeaser(id);
  }

  @UseGuards(UserGuard)
  @Post(':id/bookmark')
  @ApiBaseResponse({ notFoundError: true })
  async bookmark(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    await this.predictionService.bookmark(id, user);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiBaseResponse({ notFoundError: true })
  async destroy(@Param('id') id: number) {
    await this.predictionService.destroy(id);

    return { message: SuccessResponseMessage.DATA_DELETED };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBaseResponse({
    model: RetrievePredictionResponseDto,
    notFoundError: true,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser,
    @Query() query: LanguageIdRequestDto,
  ) {
    if (currentUser.role === UserRole.ADMIN) {
      return this.predictionService.findById(id);
    }

    return this.predictionService.findByIdConverted(
      id,
      currentUser,
      query.languageId,
    );
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  @ApiBaseResponse({
    notFoundError: true,
    badRequest: true,
  })
  async update(
    @Param('id') id: number,
    @Body() updatePredictionDto: UpdatePredictionRequestDto,
    @CurrentUser() user,
  ) {
    await this.predictionService.update(id, updatePredictionDto, user);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }
}

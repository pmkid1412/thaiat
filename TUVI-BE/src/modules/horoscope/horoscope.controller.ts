import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiBaseResponse,
  CurrentUser,
} from 'src/common/decorators/index.decorator';
import { HoroscopeService } from './horoscope.service';
import { UserGuard } from 'src/common/guards/user.guard';
import { CreateHoroscopeRequestDto } from './dto/create-horoscope.dto';
import { SuccessResponseMessage } from 'src/common/constants/message.constant';
import { UpdateHoroscopeRequestDto } from './dto/update-horoscope.dto';
import { RetrieveHoroscopeResponseDto } from './dto/retrieve-horoscope.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth()
@Controller('horoscopes')
export class HoroscopeController {
  constructor(private readonly horoscopeService: HoroscopeService) { }

  @UseGuards(UserGuard)
  @Get()
  @ApiBaseResponse({ model: RetrieveHoroscopeResponseDto })
  findOne(@CurrentUser() currentUser) {
    return this.horoscopeService.findOne(currentUser);
  }

  @UseGuards(UserGuard)
  @Post()
  @ApiBaseResponse({})
  async create(
    @Body() dto: CreateHoroscopeRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.horoscopeService.create(dto, currentUser);

    return { message: SuccessResponseMessage.DATA_CREATED };
  }

  @UseGuards(UserGuard)
  @Put()
  @ApiBaseResponse({})
  async update(
    @Body() dto: UpdateHoroscopeRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.horoscopeService.update(dto, currentUser);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }

  @UseGuards(UserGuard)
  @Get('day')
  @ApiBaseResponse({})
  getHoroscopeToday(@CurrentUser() currentUser) {
    return this.horoscopeService.getHoroscopeToday(currentUser);
  }

  @UseGuards(UserGuard)
  @Get('month')
  @ApiBaseResponse({})
  getHoroscopeThisMonth(@CurrentUser() currentUser) {
    return this.horoscopeService.getHoroscopeThisMonth(currentUser);
  }

  @UseGuards(UserGuard)
  @Get('year')
  @ApiBaseResponse({})
  getHoroscopeThisYear(@CurrentUser() currentUser) {
    return this.horoscopeService.getHoroscopeThisYear(currentUser);
  }

  @UseGuards(UserGuard)
  @Get('chart')
  @ApiBaseResponse({})
  getChart(@CurrentUser() currentUser) {
    return this.horoscopeService.getChart(currentUser);
  }

  @UseGuards(AdminGuard)
  @Get('run')
  @ApiBaseResponse({})
  run() {
    return this.horoscopeService.run();
  }
}

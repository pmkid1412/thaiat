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
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  AdminGuard,
  JwtAuthGuard,
  UserGuard,
} from 'src/common/guards/index.guard';
import { ListUserRequestDto, ListUserResponseDto } from './dto/list-user.dto';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { OverviewUserResponseDto } from './dto/overview-user.dto';
import { MeResponseDto, UserDetailResponseDto } from './dto/retrieve-user.dto';
import { ApiBaseResponse } from 'src/common/decorators/index.decorator';
import { UserRole } from 'src/common/constants/user.constant';
import {
  ChangeLanguageRequestDto,
  ChangePasswordRequestDto,
  ChangePlanRequestDto,
  ChangeUserStatusRequestDto,
  UpdateMeRequestDto,
  UpdateUserRequestDto,
} from './dto/update-user.dto';
import { StatsUserByTypeItemDto } from './dto/stats-user.dto';
import { SuccessResponseMessage } from 'src/common/constants/message.constant';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Get()
  @ApiBaseResponse({ model: ListUserResponseDto })
  findAll(@Query() query: ListUserRequestDto): Promise<ListUserResponseDto> {
    return this.userService.findAll(query);
  }

  @UseGuards(AdminGuard)
  @Post()
  @ApiBaseResponse({
    created: true,
    badRequest: true,
  })
  create(@Body() createUserDto: CreateUserRequestDto, @CurrentUser() user) {
    return this.userService.create(createUserDto, user);
  }

  @UseGuards(AdminGuard)
  @Get('overview')
  @ApiBaseResponse({ model: OverviewUserResponseDto })
  overview(): Promise<OverviewUserResponseDto> {
    return this.userService.overview();
  }

  @UseGuards(AdminGuard)
  @Get('stats/by-type')
  @ApiBaseResponse({ model: [StatsUserByTypeItemDto] })
  getUsersByTypes(): Promise<StatsUserByTypeItemDto[]> {
    return this.userService.getUsersByTypes();
  }

  @UseGuards(AdminGuard)
  @Put('change-status/:id')
  @ApiBaseResponse({ notFoundError: true, badRequest: true })
  async changeStatus(
    @Param('id') id: number,
    @Body() dto: ChangeUserStatusRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.userService.changeStatus(id, dto, currentUser);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }

  @UseGuards(AdminGuard)
  @Put('change-plan/:id')
  @ApiBaseResponse({ notFoundError: true, badRequest: true })
  async changePlan(
    @Param('id') id: number,
    @Body() dto: ChangePlanRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.userService.changePlan(id, dto, currentUser);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBaseResponse({ model: MeResponseDto })
  async getMe(@CurrentUser() currentUser): Promise<MeResponseDto> {
    return this.userService.getMe(currentUser);
  }

  @UseGuards(UserGuard)
  @Put('me')
  @ApiBaseResponse({ badRequest: true })
  async updateMe(
    @Body() updateUserDto: UpdateMeRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.userService.updateMe(updateUserDto, currentUser);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }

  @UseGuards(UserGuard)
  @Delete('me')
  @ApiBaseResponse({})
  destroyMe(@CurrentUser() currentUser): Promise<void> {
    return this.userService.destroy(currentUser.id);
  }

  @UseGuards(UserGuard)
  @Put('me/language')
  @ApiBaseResponse({ badRequest: true })
  async updateLanguage(
    @Body() dto: ChangeLanguageRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.userService.changeLanguage(currentUser, dto);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }

  @UseGuards(UserGuard)
  @Post('change-password')
  @ApiBaseResponse({})
  async changePassword(
    @Body() body: ChangePasswordRequestDto,
    @CurrentUser() user,
  ) {
    await this.userService.changePassword(user, body);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }

  @UseGuards(AdminGuard)
  @Post('set-data')
  @ApiBaseResponse({})
  async setFirebaseData() {
    await this.userService.setFirebaseData();

    return { message: SuccessResponseMessage.DATA_CREATED };
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiBaseResponse({ model: UserDetailResponseDto, notFoundError: true })
  async findOne(@Param('id') id: number): Promise<UserDetailResponseDto> {
    const user = await this.userService.findOne(id, UserRole.USER);

    return user!;
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  destroy(@Param('id') id: number): Promise<void> {
    return this.userService.permanentDestroy(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  @ApiBaseResponse({ badRequest: true })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserRequestDto,
    @CurrentUser() currentUser,
  ) {
    await this.userService.update(id, updateUserDto, currentUser);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  SocialLoginRequestDto,
} from './dto/login.dto';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';
import { RefreshTokenRequestDto } from './dto/refresh.dto';
import {
  RegisterRequestDto,
  ResendVerificationRequestDto,
  VerifyEmailRequestDto,
} from './dto/register.dto';
import {
  ResetPasswordRequestDto,
  SendEmailResetPasswordRequestDto,
  VerifyPasswordResetCodeRequestDto,
} from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { ValidatorUtil } from 'src/common/utils/validator.util';
import { AdminGuard } from 'src/common/guards/index.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('health')
  healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Post('login')
  @ApiBaseResponse({ model: LoginResponseDto })
  async login(
    @Body() loginDto: LoginRequestDto,
    @Req() req,
  ): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      const validationError = ValidatorUtil.addCustomError('email', {
        isInvalid: ErrorResponseMessage.INVALID_CREDENTIALS,
      });
      throw new BadRequestException({ errors: [validationError] });
    }
    if (!user.isActive) {
      const validationError = ValidatorUtil.addCustomError('email', {
        isDisabled: ErrorResponseMessage.ACCOUNT_IS_LOCKED,
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    return this.authService.login(user, req, loginDto.fcmToken);
  }

  @Post('social-login')
  @ApiBaseResponse({ model: LoginResponseDto })
  socialLogin(
    @Body() loginDto: SocialLoginRequestDto,
    @Req() req,
  ): Promise<LoginResponseDto> {
    return this.authService.socialLogin(loginDto, req);
  }

  @Post('refresh')
  @ApiBaseResponse({ model: LoginResponseDto, unauthorizedError: false })
  async refresh(
    @Body() refreshDto: RefreshTokenRequestDto,
  ): Promise<LoginResponseDto> {
    const { refreshToken } = refreshDto;
    const data = await this.authService.refresh(refreshToken);
    if (!data) {
      const validationError = ValidatorUtil.addCustomError('refreshToken', {
        isInvalid: ErrorResponseMessage.INVALID_TOKEN,
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    const { accessToken, newRefreshToken } = data;

    return { accessToken, refreshToken: newRefreshToken };
  }

  @Post('register')
  @ApiBaseResponse({})
  register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body);
  }

  @Post('verify-email')
  @ApiBaseResponse({})
  verifyEmail(@Body() body: VerifyEmailRequestDto) {
    return this.authService.verifyEmail(body);
  }

  @Post('resend-verification')
  @ApiBaseResponse({})
  resendVerification(@Body() body: ResendVerificationRequestDto) {
    return this.authService.resendVerification(body);
  }

  @Post('password-reset/request')
  @ApiBaseResponse({})
  sendResetPasswordEmail(@Body() body: SendEmailResetPasswordRequestDto) {
    return this.authService.sendResetPasswordEmail(body);
  }

  @Post('password-reset/verify')
  @ApiBaseResponse({})
  verifyPasswordResetCode(@Body() body: VerifyPasswordResetCodeRequestDto) {
    return this.authService.verifyPasswordResetCode(body);
  }

  @Post('password-reset/update')
  @ApiBaseResponse({})
  updatePassword(@Body() body: ResetPasswordRequestDto) {
    return this.authService.updatePassword(body);
  }

  @Post('change-password')
  @UseGuards(AdminGuard)
  @ApiBaseResponse({})
  changePassword(@Body() body: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(req.user.id, body);
  }
}

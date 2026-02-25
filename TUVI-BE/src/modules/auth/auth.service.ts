import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/config/env.config';
import {
  DateTimeUtil,
  PasswordUtil,
  TokenUtil,
  UserPlanUtil,
  ValidatorUtil,
} from 'src/common/utils/index.util';
import { OAuth2Client } from 'google-auth-library';
import appleSignin from 'apple-signin-auth';
import { LoginResponseDto, SocialLoginRequestDto } from './dto/login.dto';
import { SocialProvider } from 'src/common/constants/auth.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { DataSource, EntityManager, IsNull, Not, Repository } from 'typeorm';
import {
  ProPlanType,
  UserRole,
  UserType,
} from 'src/common/constants/user.constant';
import {
  AuthSession,
  FcmToken,
  Language,
  SocialAuth,
  ToolUsage,
  UserTypeUpgradeHistory,
} from 'src/database/entities/index.entity';
import {
  RegisterRequestDto,
  ResendVerificationRequestDto,
  VerifyEmailRequestDto,
} from './dto/register.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { LanguageName } from 'src/common/constants/language.constant';
import {
  ResetPasswordRequestDto,
  SendEmailResetPasswordRequestDto,
  VerifyPasswordResetCodeRequestDto,
} from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { ToolCode } from 'src/common/constants/tool.constant';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SocialAuth)
    private readonly socialAuthRepository: Repository<SocialAuth>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(AuthSession)
    private readonly authSessionRepository: Repository<AuthSession>,
    @InjectRepository(FcmToken)
    private readonly fcmTokenRepository: Repository<FcmToken>,
    private readonly mailService: MailService,
    private readonly dataSource: DataSource,
    private readonly firebaseService: FirebaseService,
  ) {
    this.googleClient = new OAuth2Client(env.APP.GOOGLE_CLIENT_ID);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: [
        {
          email,
          userRole: UserRole.USER,
          emailVerifiedAt: Not(IsNull()),
        },
        { email, userRole: UserRole.ADMIN },
      ],
    });
    if (user && (await PasswordUtil.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  login = async (user: any, req: Request, fcmToken?: string) => {
    const accessPayload = {
      sub: user.id,
      email: user.email,
      role: user.userRole,
    };
    const accessToken = this.jwtService.sign(accessPayload, {
      secret: env.APP.JWT_SECRET,
      expiresIn: env.APP.JWT_EXPIRY,
    });

    const sessionId = randomUUID();
    const refreshPayload = {
      ...accessPayload,
      sid: sessionId,
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: env.APP.JWT_REFRESH_SECRET,
      expiresIn: '3d',
    });

    await this.saveAuthSession(user, sessionId, refreshToken, req);
    if (fcmToken) {
      await this.saveFcmToken(user.id, fcmToken);
    }

    return { accessToken, refreshToken };
  };

  async socialLogin(
    dto: SocialLoginRequestDto,
    req: Request,
  ): Promise<LoginResponseDto> {
    const { provider, idToken } = dto;
    const validationError = ValidatorUtil.addCustomError('idToken', {
      isInvalid: ErrorResponseMessage.INVALID_TOKEN,
    });

    let payload: any;
    if (provider === SocialProvider.GOOGLE) {
      try {
        payload = await this.verifyGoogleIdToken(idToken);
      } catch (err) {
        throw new BadRequestException({ errors: [validationError] });
      }
    } else if (provider === SocialProvider.APPLE) {
      try {
        payload = await this.verifyAppleIdToken(idToken);
      } catch (err) {
        throw new BadRequestException({ errors: [validationError] });
      }
    }

    if (!payload?.sub && !payload?.email)
      throw new BadRequestException({ errors: [validationError] });

    let user = await this.userRepository.findOne({
      where: { email: payload?.email },
      relations: ['socialAuths'],
    });
    if (!user) {
      await this.dataSource.transaction(async (manager) => {
        const result = UserPlanUtil.calculatePlanDate(ProPlanType.ONE_MONTH);
        user = await manager.save(
          manager.create(User, {
            email: payload?.email,
            name: payload?.name || payload.email?.split('@')[0],
            avatar: payload?.picture || null,
            userRole: UserRole.USER,
            emailVerifiedAt: new Date(),
            password: await PasswordUtil.hash(PasswordUtil.generatePassword()),
            userType: UserType.PRO,
            proPlanType: ProPlanType.ONE_MONTH,
            proPlanStartDate: result?.proPlanStartDate || null,
            proPlanEndDate: result?.proPlanEndDate || null,
            autoRenew: false,
            upgradePlanReason: 'Dùng thử tài khoản PRO một tháng',
          }),
        );

        await manager.save(
          UserTypeUpgradeHistory,
          manager.create(UserTypeUpgradeHistory, {
            user,
            modifiedBy: user.id,
            upgradeType: ProPlanType.ONE_MONTH,
            startDate: result?.proPlanStartDate,
            endDate: result?.proPlanEndDate,
            upgradeReason: 'Dùng thử tài khoản PRO một tháng',
          }),
        );

        // Save tool usage
        await this.createToolUsage(manager, user);

        // Set data
        await this.firebaseService.setUserData(user);
      });
    } else {
      if (!user?.emailVerifiedAt) {
        await this.userRepository.update(user?.id, {
          emailVerifiedAt: new Date(),
        });
      }
      if (!user.isActive) {
        validationError.constraints = {
          isNotActive: ErrorResponseMessage.ACCOUNT_IS_LOCKED,
        };
        throw new BadRequestException({ errors: [validationError] });
      }
    }

    const socialAuths = user?.socialAuths;
    if (!socialAuths?.find((auth) => auth?.provider === provider)) {
      await this.socialAuthRepository.save(
        this.socialAuthRepository.create({
          provider,
          provider_user_id: payload?.sub,
          user: user!,
        }),
      );
    }

    return this.login(user, req, dto.fcmToken);
  }

  refresh = async (refreshToken: string) => {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const session = await this.authSessionRepository.findOne({
        where: {
          id: decoded.sid,
          revokedAt: IsNull(),
        },
      });

      if (!session) {
        return null;
      }

      if (session.userId !== decoded.sub) {
        await this.authSessionRepository.update(session.id, {
          revokedAt: new Date(),
        });
        return null;
      }

      if (
        session.expiresAt < new Date() ||
        (session.maxExpiresAt && session.maxExpiresAt < new Date())
      ) {
        await this.authSessionRepository.update(session.id, {
          revokedAt: new Date(),
        });
        return null;
      }

      const valid = TokenUtil.compare(refreshToken, session.refreshTokenHash);

      if (!valid) {
        await this.authSessionRepository.update(session.id, {
          revokedAt: new Date(),
        });
        return null;
      }

      const { exp, iat, sid, ...accessPayload } = decoded;

      const accessToken = this.jwtService.sign(accessPayload, {
        secret: env.APP.JWT_SECRET,
        expiresIn: env.APP.JWT_EXPIRY,
      });

      const refreshPayload = { ...accessPayload, sid };
      const newRefreshToken = this.jwtService.sign(refreshPayload, {
        secret: env.APP.JWT_REFRESH_SECRET,
        expiresIn: '365d',
      });

      await this.authSessionRepository.update(session.id, {
        refreshTokenHash: TokenUtil.hash(newRefreshToken),
        expiresAt: DateTimeUtil.addDays(new Date(), 365),
      });

      return { accessToken, newRefreshToken };
    } catch {
      return null;
    }
  };

  async register(dto: RegisterRequestDto) {
    const { email, password } = dto;
    const existedEmail = await this.userRepository.findOne({
      where: [
        { email, userRole: UserRole.USER, emailVerifiedAt: Not(IsNull()) },
        { email, userRole: UserRole.ADMIN },
      ],
    });
    if (existedEmail) {
      const validationError = ValidatorUtil.addCustomError('email', {
        isUnique: ErrorResponseMessage.EMAIL_ALREADY_EXISTS,
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    let result: User | null = null;
    // Handle case email is not verified
    const user = await this.userRepository.findOne({
      where: [{ email, userRole: UserRole.USER, emailVerifiedAt: IsNull() }],
    });

    if (user) {
      Object.assign(user, {
        name: dto.name,
        password: await PasswordUtil.hash(password),
      });
      result = await this.userRepository.save(user);
    } else {
      await this.dataSource.transaction(async (manager) => {
        const vietnameseLanguage = await this.languageRepository.findOne({
          where: { name: LanguageName.VIETNAMESE },
        });
        const newUser = manager.create(User, {
          ...dto,
          userRole: UserRole.USER,
          userType: UserType.FREE,
          password: await PasswordUtil.hash(password),
          language: vietnameseLanguage!,
        });
        result = await manager.save(newUser);

        // Save usage
        await this.createToolUsage(manager, newUser);
      });
    }

    if (!result || !result.id) {
      throw new Error(ErrorResponseMessage.DATA_SAVING_FAILED);
    }

    await this.sendEmailVerification(result);
    await this.firebaseService.setUserData(result);
  }

  async verifyEmail(dto: VerifyEmailRequestDto) {
    const { email, code } = dto;

    const user = await this.userRepository.findOne({
      where: {
        email,
        userRole: UserRole.USER,
        emailVerifiedAt: IsNull(),
        verificationCode: Not(IsNull()),
        verificationCodeExpires: Not(IsNull()),
      },
    });
    if (!user) {
      throw new BadRequestException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const now = new Date();
    if (user.verificationCodeExpires! < now) {
      throw new BadRequestException(
        ErrorResponseMessage.VERIFICATION_CODE_EXPIRED,
      );
    }

    if (user.verificationCode !== code) {
      throw new BadRequestException(
        ErrorResponseMessage.INVALID_VERIFICATION_CODE,
      );
    }

    const result = UserPlanUtil.calculatePlanDate(ProPlanType.ONE_MONTH);

    await this.dataSource.transaction(async (manager) => {
      Object.assign(user, {
        verificationCode: null,
        verificationCodeExpires: null,
        emailVerifiedAt: now,
        userType: UserType.PRO,
        proPlanType: ProPlanType.ONE_MONTH,
        proPlanStartDate: result?.proPlanStartDate || null,
        proPlanEndDate: result?.proPlanEndDate || null,
        autoRenew: false,
        upgradePlanReason: 'Dùng thử tài khoản PRO một tháng',
      });
      await manager.save(User, user);

      await manager.save(
        UserTypeUpgradeHistory,
        manager.create(UserTypeUpgradeHistory, {
          user,
          modifiedBy: user.id,
          upgradeType: ProPlanType.ONE_MONTH,
          startDate: result?.proPlanStartDate,
          endDate: result?.proPlanEndDate,
          upgradeReason: 'Dùng thử tài khoản PRO một tháng',
        }),
      );

      await this.firebaseService.setUserData(user);
    });
  }

  async resendVerification(dto: ResendVerificationRequestDto) {
    const { email } = dto;

    const user = await this.userRepository.findOne({
      where: {
        email,
        userRole: UserRole.USER,
        emailVerifiedAt: IsNull(),
        verificationCode: Not(IsNull()),
        verificationCodeExpires: Not(IsNull()),
      },
    });
    if (!user) {
      throw new BadRequestException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    await this.sendEmailVerification(user);
  }

  async sendResetPasswordEmail(dto: SendEmailResetPasswordRequestDto) {
    const { email } = dto;
    const user = await this.userRepository.findOne({
      where: {
        email,
        userRole: UserRole.USER,
        emailVerifiedAt: Not(IsNull()),
      },
    });
    if (!user) {
      const validationError = ValidatorUtil.addCustomError('email', {
        isInvalid: ErrorResponseMessage.INVALID_EMAIL,
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    const code = this.generate6DigitCode();
    await this.userRepository.update(user.id, {
      passwordResetCode: code,
      passwordResetCodeExpires: new Date(Date.now() + 5 * 60 * 1000),
    });

    await this.mailService.sendResetPasswordCode(email, code, user.name);
  }

  async verifyPasswordResetCode(dto: VerifyPasswordResetCodeRequestDto) {
    const { email, code } = dto;

    const user = await this.userRepository.findOne({
      where: {
        email,
        userRole: UserRole.USER,
        emailVerifiedAt: Not(IsNull()),
        passwordResetCode: Not(IsNull()),
        passwordResetCodeExpires: Not(IsNull()),
      },
    });
    if (!user) {
      throw new BadRequestException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const now = new Date();
    if (user.passwordResetCodeExpires! < now) {
      throw new BadRequestException(
        ErrorResponseMessage.PASSWORD_RESET_CODE_EXPIRED,
      );
    }

    if (user.passwordResetCode !== code) {
      throw new BadRequestException(
        ErrorResponseMessage.INVALID_PASSWORD_RESET_CODE,
      );
    }
  }

  async updatePassword(dto: ResetPasswordRequestDto) {
    const { email, code, newPassword } = dto;
    const user = await this.userRepository.findOne({
      where: {
        email,
        userRole: UserRole.USER,
        emailVerifiedAt: Not(IsNull()),
        passwordResetCode: Not(IsNull()),
        passwordResetCodeExpires: Not(IsNull()),
      },
    });
    if (!user) {
      throw new BadRequestException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    if (user.passwordResetCode !== code) {
      throw new BadRequestException(
        ErrorResponseMessage.INVALID_PASSWORD_RESET_CODE,
      );
    }

    const newPasswordHash = await PasswordUtil.hash(newPassword);
    await this.userRepository.update(user.id, {
      password: newPasswordHash,
      passwordResetCode: null,
      passwordResetCodeExpires: null,
    });
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const { currentPassword, newPassword } = dto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const isCurrentPasswordValid = await PasswordUtil.compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      const validationError = ValidatorUtil.addCustomError('currentPassword', {
        isInvalid: 'Mật khẩu hiện tại không đúng',
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    const newPasswordHash = await PasswordUtil.hash(newPassword);
    await this.userRepository.update(user.id, {
      password: newPasswordHash,
    });
  }

  private async verifyGoogleIdToken(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: env.APP.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new Error(ErrorResponseMessage.INVALID_TOKEN);

      return {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };
    } catch (err) {
      console.log(err.message);
      throw new Error(ErrorResponseMessage.VALIDATION_FAILED);
    }
  }

  private async verifyAppleIdToken(idToken: string) {
    const audiences = [env.APP.APPLE_CLIENT_ID, env.APP.APPLE_CLIENT_ID_2];

    let lastError: unknown;

    for (const audience of audiences) {
      try {
        const response = await appleSignin.verifyIdToken(idToken, {
          audience,
        });

        return {
          sub: response.sub,
          email: response.email,
        };
      } catch (err) {
        lastError = err;
        console.warn(
          `Apple ID token verification failed for audience ${audience}`,
          err instanceof Error ? err.message : err,
        );
      }
    }

    throw new Error(ErrorResponseMessage.VALIDATION_FAILED);
  }

  private generate6DigitCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async sendEmailVerification(user: User) {
    const code = this.generate6DigitCode();
    user.verificationCode = code;
    user.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000);
    await this.userRepository.save(user);

    await this.mailService.sendVerificationCode(user.email, code, user.name);
  }

  private saveAuthSession = async (
    user: User,
    sessionId: string,
    refreshToken: string,
    req: Request,
  ) => {
    await this.authSessionRepository.insert({
      id: sessionId,
      userId: user.id,
      refreshTokenHash: TokenUtil.hash(refreshToken),
      expiresAt: DateTimeUtil.addDays(new Date(), 365),
      maxExpiresAt: DateTimeUtil.addDays(new Date(), 365),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
    });
  };

  private saveFcmToken = async (userId: number, fcmToken: string) => {
    const fcmTokenRecord = await this.fcmTokenRepository.exists({
      where: { userId, token: fcmToken },
    });
    if (!fcmTokenRecord) {
      await this.fcmTokenRepository.save(
        this.fcmTokenRepository.create({
          userId,
          token: fcmToken,
        }),
      );
    }
  };

  private createToolUsage = async (manager: EntityManager, user: User) => {
    const toolCodes: { code: string; maxUsage: number }[] = [
      {
        code: ToolCode.INVESTMENT_TOOL,
        maxUsage: 3,
      },
    ];

    for (const toolCode of toolCodes) {
      const { code, maxUsage } = toolCode;
      const toolUsage = manager.create(ToolUsage, {
        toolCode: code,
        user: user,
        usedCount: 0,
        maxUsage: maxUsage,
      });
      await manager.save(ToolUsage, toolUsage);
    }
  };
}

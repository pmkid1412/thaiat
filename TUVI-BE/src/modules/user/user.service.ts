import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, IsNull, Not, Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { CreateUserRequestDto } from './dto/create-user.dto';
import {
  ErrorResponseMessage,
  Ordering,
  ProPlanType,
  UserRole,
  UserStatus,
  UserType,
  UserTypeName,
} from 'src/common/constants/index.constant';
import { ListUserRequestDto, ListUserResponseDto } from './dto/list-user.dto';
import {
  ValueUtil,
  PasswordUtil,
  DateTimeUtil,
  ValidatorUtil,
  UserPlanUtil,
} from 'src/common/utils/index.util';
import { MeResponseDto, UserDetailResponseDto } from './dto/retrieve-user.dto';
import {
  ChangeLanguageRequestDto,
  ChangePasswordRequestDto,
  ChangePlanRequestDto,
  ChangeUserStatusRequestDto,
  UpdateMeRequestDto,
  UpdateUserRequestDto,
} from './dto/update-user.dto';
import { StatsUserByTypeItemDto } from './dto/stats-user.dto';
import { UserTypeUpgradeHistory } from 'src/database/entities/user-type-upgrade-history.entity';
import { MailService } from '../mail/mail.service';
import { ToolCode } from 'src/common/constants/tool.constant';
import { ToolUsage } from 'src/database/entities/tool-usage.entity';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly mailService: MailService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findAll(query: ListUserRequestDto): Promise<ListUserResponseDto> {
    const { type, search, status, page = 1, pageSize = 50 } = query;

    const qb = this.userRepository.createQueryBuilder('user').withDeleted();
    qb.select([
      'user.id',
      'user.name',
      'user.email',
      'user.phoneNumber',
      'user.userType',
      'user.createdAt',
      'user.isActive',
      'user.deletedAt',
    ]);
    qb.where('user.userRole = :role', { role: UserRole.USER });

    if (ValueUtil.isNotUndefined(type)) {
      qb.andWhere('user.userType = :type', { type });
    }

    if (ValueUtil.isNotUndefined(status)) {
      if (status === UserStatus.ACTIVE || status === UserStatus.INACTIVE) {
        qb.andWhere('user.isActive = :isActive', {
          isActive: status === UserStatus.ACTIVE,
        });
        qb.andWhere('user.deletedAt IS NULL');
      } else if (status === UserStatus.DELETED) {
        qb.andWhere('user.deletedAt IS NOT NULL');
      }
    }

    if (search) {
      qb.andWhere(
        '(user.name LIKE :search OR user.email LIKE :search OR user.phoneNumber LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    qb.orderBy('user.createdAt', Ordering.DESC)
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [data, total] = await qb.getManyAndCount();

    const result = data.map((user) => {
      const { createdAt, isActive, deletedAt, ...userData } = user;
      let userStatus = '';
      if (deletedAt) {
        userStatus = UserStatus.DELETED;
      } else {
        userStatus = isActive ? UserStatus.ACTIVE : UserStatus.INACTIVE;
      }

      return {
        ...userData,
        registeredAt: DateTimeUtil.formatDate(createdAt),
        status: userStatus,
      };
    });

    return {
      data: result,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number, role?: number): Promise<UserDetailResponseDto> {
    const whereCondition = { id };
    if (role) {
      whereCondition['userRole'] = role;
    }
    const user = await this.userRepository.findOne({
      where: whereCondition,
      relations: ['upgradeHistories'],
      order: {
        upgradeHistories: { createdAt: Ordering.DESC },
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      dateOfBirth: user.dateOfBirth,
      timeOfBirth: user.timeOfBirth,
      placeOfBirth: user.placeOfBirth,
      userType: user.userType,
      timezone: user.timezone,
      upgradeHistories: user.upgradeHistories.map((history) => {
        const { startDate, endDate, upgradeType, ...historyData } = history;
        let historyStartDate: string =
          DateTimeUtil.convertToLocalString(startDate);
        let historyEndDate: string = DateTimeUtil.convertToLocalString(endDate);
        if (upgradeType === ProPlanType.CUSTOM) {
          historyStartDate = DateTimeUtil.convertToLocalString(startDate);
          historyEndDate = DateTimeUtil.convertToLocalString(endDate);
        }

        return {
          id: historyData.id,
          upgradeType,
          startDate: historyStartDate,
          endDate: historyEndDate,
          upgradeReason: history.upgradeReason,
          createdAt: DateTimeUtil.convertToLocalString(historyData.createdAt),
        };
      }),
    };
  }

  async findOneByEmail(email: string, role?: number): Promise<User | null> {
    const whereCondition = { email };
    if (role) {
      whereCondition['userRole'] = role;
    }

    return this.userRepository.findOne({ where: whereCondition });
  }

  async create(createUserDto: CreateUserRequestDto, currentUser: User) {
    const {
      userType,
      proPlanType,
      proPlanStartDate: proPlanStartDateDto,
      proPlanEndDate: proPlanEndDateDto,
      autoRenew = false,
    } = createUserDto;

    this.validatePlan(
      userType,
      proPlanType,
      proPlanStartDateDto,
      proPlanEndDateDto,
      null,
      null,
    );

    let proPlanStartDate: string | null = null;
    let proPlanEndDate: string | null = null;

    if (userType === UserType.PRO) {
      const result = UserPlanUtil.calculatePlanDate(
        proPlanType,
        undefined,
        undefined,
        undefined,
        proPlanStartDateDto,
        proPlanEndDateDto,
      );

      proPlanStartDate = result?.proPlanStartDate || null;
      proPlanEndDate = result?.proPlanEndDate || null;
    }

    return await this.dataSource.transaction(async (manager) => {
      const password = PasswordUtil.generatePassword();
      const hashedPassword = await PasswordUtil.hash(password);
      const user = manager.create(User, {
        ...createUserDto,
        userRole: UserRole.USER,
        password: hashedPassword,
        emailVerifiedAt: new Date(),
        autoRenew: userType === UserType.FREE ? false : autoRenew,
        proPlanType: userType === UserType.FREE ? null : proPlanType,
        proPlanStartDate,
        proPlanEndDate,
        upgradePlanReason:
          userType === UserType.FREE
            ? null
            : createUserDto.upgradePlanReason || null,
        lastModifiedBy: currentUser.id,
      });
      await manager.save(user);

      await this.savePlanHistory(
        manager,
        userType,
        proPlanType,
        proPlanStartDate,
        proPlanEndDate,
        null,
        null,
        null,
        user,
        currentUser,
        createUserDto.upgradePlanReason,
      );

      // Save usage
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

      await this.mailService.sendPasswordNotification(
        user.email,
        password,
        user.name,
      );

      // create firebase data
      await this.firebaseService.setUserData(user);
    });
  }

  async overview() {
    const totalUsers = await this.userRepository.count({
      where: { userRole: UserRole.USER },
      withDeleted: true,
    });
    const proUsers = await this.userRepository.count({
      where: {
        userType: UserType.PRO,
        userRole: UserRole.USER,
      },
      withDeleted: true,
    });
    const freeUsers = await this.userRepository.count({
      where: {
        userType: UserType.FREE,
        userRole: UserRole.USER,
      },
      withDeleted: true,
    });

    const birthChartUsers = await this.userRepository.count({
      where: {
        userRole: UserRole.USER,
        dateOfBirth: Not(IsNull()),
      },
      withDeleted: true,
    });

    return { totalUsers, proUsers, freeUsers, birthChartUsers };
  }

  async destroy(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, userRole: UserRole.USER, isActive: true },
    });
    if (!user) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    await this.userRepository.softRemove(user);
  }

  async permanentDestroy(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, userRole: UserRole.USER },
    });
    if (!user) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    await this.userRepository.remove(user);
  }

  async update(
    id: number,
    dto: UpdateUserRequestDto,
    currentUser: User,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const existed = await this.userRepository.exists({
      where: { id: Not(id), email: dto.email },
    });
    if (existed) {
      const validationError = ValidatorUtil.addCustomError('email', {
        isUnique: ErrorResponseMessage.EMAIL_ALREADY_EXISTS,
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    const {
      userType,
      proPlanType,
      proPlanStartDate: proPlanStartDateDto,
      proPlanEndDate: proPlanEndDateDto,
      autoRenew = false,
    } = dto;
    const currentProPlanType = user.proPlanType;
    const currentProPlanStartDate = user.proPlanStartDate;
    const currentProPlanEndDate = user.proPlanEndDate;
    this.validatePlan(
      userType,
      proPlanType,
      proPlanStartDateDto,
      proPlanEndDateDto,
      currentProPlanType,
      currentProPlanEndDate,
    );

    let proPlanStartDate: string | null = null;
    let proPlanEndDate: string | null = null;

    if (userType === UserType.PRO) {
      const result = UserPlanUtil.calculatePlanDate(
        proPlanType,
        currentProPlanType || '',
        currentProPlanStartDate,
        currentProPlanEndDate,
        proPlanStartDateDto,
        proPlanEndDateDto,
      );

      proPlanStartDate = result?.proPlanStartDate || null;
      proPlanEndDate = result?.proPlanEndDate || null;
    }

    await this.dataSource.transaction(async (manager) => {
      Object.assign(user, {
        ...dto,
        autoRenew: userType === UserType.FREE ? false : autoRenew,
        proPlanType: userType === UserType.FREE ? null : proPlanType,
        proPlanStartDate,
        proPlanEndDate,
        upgradePlanReason:
          userType === UserType.FREE ? null : dto.upgradePlanReason || null,
        lastModifiedBy: currentUser.id,
      });
      await manager.save(user);

      await this.savePlanHistory(
        manager,
        userType,
        proPlanType,
        proPlanStartDate,
        proPlanEndDate,
        currentProPlanType,
        currentProPlanStartDate,
        currentProPlanEndDate,
        user,
        currentUser,
        dto.upgradePlanReason,
      );
    });
  }

  async getMe(currentUser: User): Promise<MeResponseDto> {
    const user = await this.userRepository.findOne({
      where: [
        {
          id: currentUser.id,
          isActive: true,
          userRole: UserRole.USER,
          emailVerifiedAt: Not(IsNull()),
        },
        {
          id: currentUser.id,
          isActive: true,
          userRole: UserRole.ADMIN,
        },
      ],
      relations: ['language', 'toolUsages'],
    });
    if (!user) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const userTypeMap = {
      [UserType.FREE]: UserTypeName.FREE,
      [UserType.PRO]: UserTypeName.PRO,
    };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      dateOfBirth: user.dateOfBirth,
      timeOfBirth: user.timeOfBirth,
      placeOfBirth: user.placeOfBirth,
      userType: userTypeMap[user.userType],
      timezone: user.timezone,
      phoneNumber: user.phoneNumber,
      language: user.language
        ? {
            id: user.language.id,
            name: user.language.name,
          }
        : null,
      proPlanType: user.proPlanType,
      proPlanStartDate: user.proPlanStartDate
        ? DateTimeUtil.convertToLocalString(user.proPlanStartDate)
        : null,
      proPlanEndDate: user.proPlanEndDate
        ? DateTimeUtil.convertToLocalString(user.proPlanEndDate)
        : null,
      toolUsages: user.toolUsages.map((toolUsage) => {
        return {
          toolCode: toolUsage.toolCode,
          usedCount: toolUsage.usedCount,
          maxUsage: toolUsage.maxUsage,
        };
      }),
    };
  }

  async updateMe(
    updateUserDto: UpdateMeRequestDto,
    currentUser: User,
  ): Promise<void> {
    await this.userRepository.update(currentUser.id, {
      ...updateUserDto,
      lastModifiedBy: currentUser.id,
    });
  }

  async changeLanguage(currentUser: User, dto: ChangeLanguageRequestDto) {
    const { languageId } = dto;
    const userId = currentUser.id;

    await this.userRepository.update(userId, {
      language: { id: languageId },
      lastModifiedBy: currentUser.id,
    });
  }

  async changeStatus(
    id: number,
    dto: ChangeUserStatusRequestDto,
    currentUser: User,
  ) {
    const user = await this.userRepository.findOne({
      where: { id, userRole: UserRole.USER },
    });
    if (!user) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }
    const { status } = dto;
    let inactiveAt: Date | null = null;
    if (status === UserStatus.INACTIVE) {
      inactiveAt = new Date();
    }

    await this.userRepository.update(id, {
      isActive: dto.status === UserStatus.ACTIVE,
      lastModifiedBy: currentUser.id,
      inactiveAt,
    });
  }

  async changePlan(id: number, dto: ChangePlanRequestDto, currentUser: User) {
    const user = await this.userRepository.findOne({
      where: { id, userRole: UserRole.USER },
    });
    if (!user) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const {
      userType,
      proPlanType,
      proPlanStartDate: proPlanStartDateDto,
      proPlanEndDate: proPlanEndDateDto,
      autoRenew = false,
    } = dto;
    const currentProPlanType = user.proPlanType;
    const currentProPlanStartDate = user.proPlanStartDate;
    const currentProPlanEndDate = user.proPlanEndDate;
    this.validatePlan(
      userType,
      proPlanType,
      proPlanStartDateDto,
      proPlanEndDateDto,
      currentProPlanType,
      currentProPlanEndDate,
    );

    let proPlanStartDate: string | null = null;
    let proPlanEndDate: string | null = null;

    if (userType === UserType.PRO) {
      const result = UserPlanUtil.calculatePlanDate(
        proPlanType,
        currentProPlanType || '',
        currentProPlanStartDate,
        currentProPlanEndDate,
        proPlanStartDateDto,
        proPlanEndDateDto,
      );

      proPlanStartDate = result?.proPlanStartDate || null;
      proPlanEndDate = result?.proPlanEndDate || null;
    }

    const needToSendUpgradeNotification =
      userType === UserType.PRO && user.userType === UserType.FREE;
    const needToEmitNotification = userType !== user.userType;

    await this.dataSource.transaction(async (manager) => {
      Object.assign(user, {
        userType,
        autoRenew: userType === UserType.FREE ? false : autoRenew,
        proPlanType: userType === UserType.FREE ? null : proPlanType,
        proPlanStartDate,
        proPlanEndDate,
        upgradePlanReason:
          userType === UserType.FREE ? null : dto.upgradePlanReason || null,
        lastModifiedBy: currentUser.id,
      });
      await manager.save(user);

      await this.savePlanHistory(
        manager,
        userType,
        proPlanType,
        proPlanStartDate,
        proPlanEndDate,
        currentProPlanType,
        currentProPlanStartDate,
        currentProPlanEndDate,
        user,
        currentUser,
        dto.upgradePlanReason,
      );
    });

    // Send notification email
    if (needToSendUpgradeNotification) {
      await this.mailService.sendProUpgradeNotification(user.email, user.name);
    }

    // Emit firebase notification
    if (needToEmitNotification) {
      await this.firebaseService.updateUserData(user.id, {
        type: userType === UserType.PRO ? 'Pro' : 'Free',
        updatedAt: Date.now(),
      });
      await this.firebaseService.sendChangePlanNotification(user.id, userType);
    }
  }

  async getUsersByTypes() {
    const userTypes = Object.keys(UserType);

    const result: StatsUserByTypeItemDto[] = [];

    for (const userType of userTypes) {
      const userCount = await this.userRepository.count({
        where: { userType: UserType[userType], userRole: UserRole.USER },
      });
      result.push({
        userType: UserTypeName[userType],
        userCount,
      });
    }

    return result;
  }

  async changePassword(currentUser: User, dto: ChangePasswordRequestDto) {
    const { oldPassword, newPassword } = dto;
    const currentUserId = currentUser.id;
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id, userRole: UserRole.USER },
    });

    const isMatch = await PasswordUtil.compare(oldPassword, user!.password);
    if (!isMatch) {
      const validationError = ValidatorUtil.addCustomError('oldPassword', {
        isNotMatch: ErrorResponseMessage.OLD_PASSWORD_NOT_MATCH,
      });
      throw new BadRequestException({ errors: [validationError] });
    }

    await this.userRepository.update(currentUserId, {
      password: await PasswordUtil.hash(newPassword),
      lastModifiedBy: currentUserId,
    });
  }

  async setFirebaseData() {
    const users = await this.userRepository.find({
      where: {
        userRole: UserRole.USER,
        emailVerifiedAt: Not(IsNull()),
        isActive: true,
      },
    });

    for (const user of users) {
      await this.firebaseService.setUserData(user);
    }
  }

  private validatePlan(
    userType: number,
    proPlanType: any,
    proPlanStartDateDto: any,
    proPlanEndDateDto: any,
    currentProPlanType: any,
    currentProPlanEndDate: any,
  ) {
    if (userType === UserType.PRO) {
      if (!proPlanType) {
        const validationError = ValidatorUtil.addCustomError('proPlanType', {
          isRequired: ErrorResponseMessage.FIELD_IS_REQUIRED,
        });
        throw new BadRequestException({ errors: [validationError] });
      }

      if (proPlanType === ProPlanType.CUSTOM) {
        if (!proPlanStartDateDto || !proPlanEndDateDto) {
          const validationError = ValidatorUtil.addCustomError(
            'proPlanStartDate',
            {
              isRequired: ErrorResponseMessage.FIELD_IS_REQUIRED,
            },
          );
          throw new BadRequestException({ errors: [validationError] });
        }

        if (!proPlanEndDateDto) {
          const validationError = ValidatorUtil.addCustomError(
            'proPlanEndDate',
            {
              isRequired: ErrorResponseMessage.FIELD_IS_REQUIRED,
            },
          );
          throw new BadRequestException({ errors: [validationError] });
        }

        if (DateTimeUtil.isLessThan(proPlanEndDateDto, proPlanStartDateDto)) {
          const validationError = ValidatorUtil.addCustomError(
            'proPlanEndDate',
            {
              isLessThan: ErrorResponseMessage.INVALID_VALUE,
            },
          );
          throw new BadRequestException({ errors: [validationError] });
        }
      } else {
        const currentDate = DateTimeUtil.getCurrentLocalDateTime();
        if (
          currentProPlanType &&
          proPlanType !== ProPlanType.CUSTOM &&
          currentProPlanType !== ProPlanType.CUSTOM
        ) {
          if (
            DateTimeUtil.isLessThan(
              currentProPlanEndDate.toISOString(),
              currentDate,
            )
          ) {
            const validationError = ValidatorUtil.addCustomError(
              'proPlanType',
              {
                isLessThan: ErrorResponseMessage.INVALID_VALUE,
              },
            );
            throw new BadRequestException({ errors: [validationError] });
          }
        }
      }
    }
  }

  private async savePlanHistory(
    manager: EntityManager,
    userType: number,
    proPlanType: any,
    proPlanStartDate: any,
    proPlanEndDate: any,
    currentProPlanType: any,
    currentProPlanStartDate: any,
    currentProPlanEndDate: any,
    user: User,
    currentUser: User,
    upgradeReason: string,
  ) {
    if (
      userType === UserType.PRO &&
      proPlanType &&
      (currentProPlanType !== proPlanType ||
        (currentProPlanType === ProPlanType.CUSTOM &&
          proPlanType === ProPlanType.CUSTOM &&
          (currentProPlanEndDate.toISOString() !== proPlanEndDate ||
            currentProPlanStartDate.toISOString() !== proPlanStartDate)))
    ) {
      await manager.save(
        UserTypeUpgradeHistory,
        manager.create(UserTypeUpgradeHistory, {
          user,
          modifiedBy: currentUser.id,
          upgradeType: proPlanType,
          startDate: proPlanStartDate!,
          endDate: proPlanEndDate!,
          upgradeReason,
        }),
      );
    }
  }
}

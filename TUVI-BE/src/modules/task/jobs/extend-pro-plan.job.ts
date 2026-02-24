import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { DataSource, EntityManager, IsNull, Not, Repository } from 'typeorm';
import {
  ProPlanType,
  UserRole,
  UserType,
} from 'src/common/constants/user.constant';
import { UserPlanUtil } from 'src/common/utils/user_plan.util';
import { DateTimeUtil } from 'src/common/utils/datetime.utils';
import { UserTypeUpgradeHistory } from 'src/database/entities/user-type-upgrade-history.entity';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class ExtendProPlanJob {
  private isRunning = false;

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handle() {
    if (this.isRunning) {
      console.warn('Previous job still running, skipping this interval');
      return; // skip this run
    }

    this.isRunning = true;

    await this.extendPlan();

    this.isRunning = false;
  }

  private extendPlan = async () => {
    const now = new Date();
    // console.log('Start extend plan at ', now);

    const users = await this.userRepository.find({
      where: {
        isActive: true,
        emailVerifiedAt: Not(IsNull()),
        userRole: UserRole.USER,
        userType: UserType.PRO,
      },
    });

    for (const user of users) {
      const autoRenew = user.autoRenew;
      const currentEndDate = user.proPlanEndDate;
      // console.log(
      //   `Process user ${user.id} with auto renew ${autoRenew} and end date ${currentEndDate}`,
      // );
      if (currentEndDate && currentEndDate < now) {
        if (autoRenew) {
          const currentStartDate = user.proPlanStartDate!;
          const proPlanType = user.proPlanType!;
          let newStartDate: string | null = null;
          let newEndDate: string | null = null;

          // console.log('User plan is ', proPlanType);
          if (proPlanType === ProPlanType.CUSTOM) {
            const result = this.calculateCustomDate(
              currentStartDate,
              currentEndDate,
            );
            newStartDate = result.newStartDate;
            newEndDate = result.newEndDate;
          } else {
            const result = UserPlanUtil.calculatePlanDate(
              proPlanType,
              proPlanType,
              currentEndDate,
              currentEndDate,
              newStartDate,
              newEndDate,
            );

            newStartDate = result?.proPlanStartDate || null;
            newEndDate = result?.proPlanEndDate || null;
          }

          this.dataSource.transaction(async (manager) => {
            Object.assign(user, {
              proPlanStartDate: newStartDate,
              proPlanEndDate: newEndDate,
            });
            await manager.save(user);
            await this.savePlanHistory(
              manager,
              user.proPlanType,
              newStartDate,
              newEndDate,
              user,
              user,
              'Hệ thống tự đông gia hạn',
            );
          });
        } else {
          user.userType = UserType.FREE;
          user.proPlanType = null;
          user.proPlanStartDate = null;
          user.proPlanEndDate = null;
          await this.userRepository.save(user);
          await this.firebaseService.updateUserData(user.id, {
            type: 'Free',
            updatedAt: Date.now(),
          });
          await this.firebaseService.sendChangePlanNotification(
            user.id,
            UserType.FREE,
          );
        }
      }
    }
  };

  private calculateCustomDate = (
    currentStartDate: Date,
    currentEndDate: Date,
  ) => {
    const planDays = DateTimeUtil.daysBetweenDates(
      currentStartDate,
      currentEndDate,
    );
    // console.log('planDays', planDays);
    const newStartDate = currentEndDate.toISOString();
    // console.log('New start date', newStartDate);
    const newEndDate = DateTimeUtil.addDays(
      currentEndDate,
      planDays,
    ).toISOString();
    // console.log('New end date', newEndDate);

    return { newStartDate, newEndDate };
  };

  private async savePlanHistory(
    manager: EntityManager,
    proPlanType: any,
    proPlanStartDate: any,
    proPlanEndDate: any,
    user: User,
    currentUser: User,
    upgradeReason: string,
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

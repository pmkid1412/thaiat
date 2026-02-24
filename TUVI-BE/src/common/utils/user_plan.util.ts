import { ProPlanType } from '../constants/index.constant';
import { DateTimeUtil } from './index.util';

export class UserPlanUtil {
  static calculatePlanDate(
    planType: string,
    currentPlan: string = '',
    currentStartDate: Date | null = null,
    currentEndDate: Date | null = null,
    newStartDate: string | null = null,
    newEndDate: string | null = null,
  ) {
    let proPlanStartDate: string | null = null;
    let proPlanEndDate: string | null = null;

    if (planType === ProPlanType.CUSTOM) {
      const currentTime = DateTimeUtil.getCurrentLocalTimeString();
      proPlanStartDate = `${newStartDate} ${currentTime}`;
      proPlanEndDate = `${newEndDate} ${currentTime}`;
    } else {
      const monthMap = UserPlanUtil.getMonthMap();
      const planMonth = monthMap[planType];
      const currentPlanMonth = monthMap[currentPlan];
      if (currentPlan) {
        if (currentPlan === planType) {
          proPlanStartDate = currentStartDate!.toISOString();
        } else {
          if (planMonth > currentPlanMonth) {
            proPlanStartDate = currentEndDate!.toISOString();
          } else {
            proPlanStartDate = currentStartDate!.toISOString();
          }
        }
      } else {
        proPlanStartDate = DateTimeUtil.getCurrentLocalDateTime();
      }

      proPlanEndDate = DateTimeUtil.addMonths(proPlanStartDate, planMonth);
    }
    return { proPlanStartDate, proPlanEndDate };
  }

  static getMonthMap() {
    return {
      [ProPlanType.ONE_MONTH]: 1,
      [ProPlanType.THREE_MONTHS]: 3,
      [ProPlanType.SIX_MONTHS]: 6,
      [ProPlanType.TWELVE_MONTHS]: 12,
    };
  }
}

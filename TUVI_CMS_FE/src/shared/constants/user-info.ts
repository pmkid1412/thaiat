import { ProPlanType, UserStatus } from "./user";

export const userTypes = [
  { label: "Free", value: "0" },
  { label: "Pro", value: "1" },
];

export const timezones = ["Asia/Ho_Chi_Minh", "Asia/Bangkok", "Asia/Singapore"];

export const PRO_PLAN_TYPES = [
  { label: "1 tháng", value: ProPlanType.ONE_MONTH, months: 1 },
  { label: "3 tháng", value: ProPlanType.THREE_MONTHS, months: 3 },
  { label: "6 tháng", value: ProPlanType.SIX_MONTHS, months: 6 },
  { label: "12 tháng", value: ProPlanType.TWELVE_MONTHS, months: 12 },
  { label: "Tùy chỉnh", value: ProPlanType.CUSTOM, months: null },
];

export const USER_STATUS_OPTIONS = [
  { label: "Tất cả", value: "all" },
  { label: "Hoạt động", value: UserStatus.ACTIVE, color: "green" },
  { label: "Không hoạt động", value: UserStatus.INACTIVE, color: "yellow" },
  { label: "Đã xóa", value: UserStatus.DELETED, color: "red" },
];

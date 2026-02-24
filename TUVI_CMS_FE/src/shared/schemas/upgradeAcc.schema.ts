import z from "zod";

import { ProPlanType } from "../constants";

export const UpgradeUserSchema = z
  .object({
    userType: z.number(),
    proPlanType: z.string().min(1, "Vui lòng chọn loại gói"),
    proPlanStartDate: z.string(),
    proPlanEndDate: z.string(),
    autoRenew: z.boolean().optional(),
    upgradePlanReason: z
      .string()
      .max(500, {
        error: "Lý do không được vượt quá 500 ký tự",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.proPlanType === ProPlanType.CUSTOM) {
        // Pro user
        if (data.proPlanStartDate === undefined) return false;
      }
      return true;
    },
    {
      message: "Vui lòng chọn ngày bắt đầu gói Pro",
      path: ["proPlanStartDate"],
    }
  )
  .refine(
    (data) => {
      if (data.proPlanType === ProPlanType.CUSTOM) {
        // Pro user
        if (data.proPlanEndDate === undefined) return false;
      }
      return true;
    },
    {
      message: "Vui lòng chọn ngày kết thúc gói Pro",
      path: ["proPlanEndDate"],
    }
  )
  .refine(
    (data) => {
      if (data.proPlanType === ProPlanType.CUSTOM) {
        if (!data.proPlanStartDate || !data.proPlanEndDate) return true;
        const start = new Date(data.proPlanStartDate);
        const end = new Date(data.proPlanEndDate);
        return start <= end;
      }
      return true;
    },
    {
      message: "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu",
      path: ["proPlanEndDate"],
    }
  );

export type UpgradeUserAccount = z.infer<typeof UpgradeUserSchema>;
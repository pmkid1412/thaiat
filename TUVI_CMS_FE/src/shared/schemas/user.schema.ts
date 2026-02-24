import { z } from "zod";

import { ProPlanType } from "../constants";

export const userFormSchema = z
  .object({
    name: z
      .string()
      .nonempty("Vui lòng nhập tên người dùng")
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được vượt quá 50 ký tự"),
    email: z
      .string()
      .nonempty("Vui lòng nhập email")
      .pipe(z.email("Vui lòng nhập đúng định dạng email")),
    avatar: z.string().optional(),
    dateOfBirth: z.string().nullable().optional(),
    timeOfBirth: z.string().nullable().optional(),
    placeOfBirth: z.string().max(200, {error: "Nơi "}).nullable().optional(),
    userType: z.string().nonempty("Vui lòng chọn loại người dùng"),
    timezone: z.string().nonempty("Vui lòng chọn ít nhất một múi giờ"),
    proPlanType: z.string().optional(),
    proPlanStartDate: z.string().optional(),
    proPlanEndDate: z.string().optional(),
    autoRenew: z.boolean().optional(),
    upgradePlanReason: z
      .string()
      .optional()
      .refine(
        (reason) => {
          if (!reason) return true; // Optional field
          return reason.trim().length >= 10;
        },
        "Lý do nâng cấp phải có ít nhất 10 ký tự"
      ),
  })
  .refine(
    (data) => {
      if (data.userType === "1") {
        // Pro user
        if (data.proPlanType === undefined) return false;
      }
      return true;
    },
    {
      message: "Vui lòng chọn loại gói Pro",
      path: ["proPlanType"],
    }
  )
  .refine(
    (data) => {
      if (data.userType === "1" && data.proPlanType === ProPlanType.CUSTOM) {
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
      if (data.userType === "1" && data.proPlanType === ProPlanType.CUSTOM) {
        // Pro user with custom plan
        if (!data.proPlanStartDate || !data.proPlanEndDate) return false;
        const startDate = new Date(data.proPlanStartDate);
        const endDate = new Date(data.proPlanEndDate);
        return startDate < endDate;
      }
      return true;
    },
    {
      message: "Ngày kết thúc phải sau ngày bắt đầu",
      path: ["proPlanEndDate"],
    }
  );

export type UserFormData = z.infer<typeof userFormSchema>;

// Type for API requests - converts userType string to number
export type UserApiRequest = Omit<UserFormData, "userType"> & {
  userType: number;
};

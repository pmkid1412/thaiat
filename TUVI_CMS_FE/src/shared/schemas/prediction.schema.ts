import { z } from "zod";
import { PREDICTION_TYPES } from "../constants";

const fields = ["title", "summary", "description"] as const;

export const predictionDataSchema = z.object({
  languageId: z.number().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
});

export const predictionFormSchema = z
  .object({
    predictionDate: z.string().nonempty("Vui lòng chọn ngày dự đoán"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    domainId: z.string().nonempty("Vui lòng chọn lĩnh vực"),
    impactLevelId: z.string().nonempty("Vui lòng chọn mức độ ảnh hưởng"),
    predictionStatusId: z.string().nonempty("Vui lòng chọn trạng thái dự đoán"),
    confidenceScore: z
      .number()
      .min(0, "Độ tin cậy phải từ 0 trở lên")
      .max(100, "Độ tin cậy không được vượt quá 100"),
    areas: z.array(z.number()).min(1, "Vui lòng nhập ít nhất một quốc gia"),
    tags: z
      .string()
      .optional()
      .transform((val) => (val ? val.trim() : val)),
    type: z
      .enum(PREDICTION_TYPES)
      .nonoptional({ error: "Vui lòng chọn loại dự đoán" }),
    thumbnailUrl: z.string().optional(),
    isDraft: z
      .boolean()
      .nonoptional({ error: "Vui lòng chọn trạng thái bản nháp" }),
    predictionData: z.array(predictionDataSchema).superRefine((arr, ctx) => {
      // 1. Kiểm tra có ít nhất 1 predictionData đủ 4 trường
      const isFilled = (item: PredictionDataFormData) =>
        fields.every((key) => !!item[key] && item[key].trim() !== "");
      const isEmpty = (item: PredictionDataFormData) =>
        fields.every((key) => !item[key] || item[key].trim() === "");

      const atLeastOneFilled = arr.some(isFilled);

      if (!atLeastOneFilled) {
        // Nếu tất cả đều rỗng hoặc thiếu, báo lỗi cho tất cả các trường của tất cả các phần tử
        arr.forEach((item, idx) => {
          fields.forEach((key) => {
            if (!item[key] || item[key].trim() === "") {
              ctx.addIssue({
                code: "custom",
                message: `Vui lòng nhập ${getFieldLabel(key)}`,
                path: [idx, key],
              });
            }
          });
        });
        return;
      }

      // 2. Nếu có predictionData nào không rỗng hoàn toàn nhưng thiếu trường, báo lỗi cho trường thiếu
      arr.forEach((item, idx) => {
        if (!isEmpty(item) && !isFilled(item)) {
          fields.forEach((key) => {
            if (!item[key] || item[key].trim() === "") {
              ctx.addIssue({
                code: "custom",
                message: `Vui lòng nhập ${getFieldLabel(key)}`,
                path: [idx, key],
              });
            }
          });
        }
      });
    }),
  })
  .refine(
    (data) => {
      // Only validate if both dates are provided
      if (!data.startDate || !data.endDate) return true;

      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start <= end;
    },
    {
      message: "Ngày kết thúc phải bằng hoặc sau ngày bắt đầu",
      path: ["endDate"],
    }
  );

function getFieldLabel(key: string) {
  switch (key) {
    case "title":
      return "tiêu đề";
    case "summary":
      return "tóm tắt";
    case "description":
      return "mô tả";
    default:
      return key;
  }
}

export type PredictionDataFormData = z.infer<typeof predictionDataSchema>;
export type PredictionFormData = z.infer<typeof predictionFormSchema>;

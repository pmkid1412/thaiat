import { z } from "zod";

export const evidenceFormSchema = z.object({
  title: z
    .string()
    .min(1, "Vui lòng nhập tiêu đề")
    .max(200, { error: "Tiêu đề không vượt quá 200 ký tự" }),
  source: z
    .string()
    .min(1, "Vui lòng nhập nguồn")
    .max(100, { error: "Nguồn không vượt quá 100 ký tự" }),
  link: z
    .string()
    .nonempty({ error: "Vui lòng nhập link bài viết" })
    .max(300, { error: "Link không vượt quá 300 ký tự" })
    .pipe(z.url("Vui lòng nhập link hợp lệ")),
  publishedDate: z.string().optional(),
  confidenceScore: z
    .number()
    .min(0, "Độ tin cậy phải từ 0 trở lên")
    .max(100, { error: "Độ tin cậy không vượt quá 100" }),
  quote: z
    .string()
    .max(500, {
      error: "Trích dẫn không vượt quá 500 ký tự",
    })
    .optional(),
});

export type EvidenceFormData = z.infer<typeof evidenceFormSchema>;

export const DEFAULT_VALUES = {
  title: "",
  source: "",
  link: "",
  confidenceScore: 50,
  quote: "",
};
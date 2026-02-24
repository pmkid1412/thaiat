import { z } from "zod";

export const configFormSchema = z.object({
  value: z.string().nonempty("Vui lòng nhập giá trị"),
});

export const configFileFormSchema = z.object({
  file: z
    .instanceof(File, { message: "Vui lòng chọn file" })
    .nullable()
    .refine((file) => file !== null, { message: "Vui lòng chọn file" }),
});

export type ConfigFormData = z.infer<typeof configFormSchema>;
export type ConfigFileFormData = z.infer<typeof configFileFormSchema>;

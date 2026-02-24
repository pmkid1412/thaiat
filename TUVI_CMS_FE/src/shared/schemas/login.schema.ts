import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty({ error: "Vui lòng nhập tên đăng nhập" })
    .pipe(z.email({ error: "Vui lòng nhập đúng định dạng email" })),
  password: z.string().nonempty({ error: "Vui lòng nhập mật khẩu" }),
});

export type LoginData = z.infer<typeof loginFormSchema>;

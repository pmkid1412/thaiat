import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { loginFormSchema, type LoginData } from "@/shared/schemas/login.schema";

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  loading?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          control={form.control}
          name="email"
          label="Tên đăng nhập"
          required
        />

        <TextField
          control={form.control}
          name="password"
          label="Mật khẩu"
          type="password"
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Spinner />}
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};

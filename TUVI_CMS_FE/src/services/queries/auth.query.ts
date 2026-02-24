import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { ROUTES } from "@/shared/constants";
import type { LoginData } from "@/shared/schemas/login.schema";
import { saveTokenToCookie } from "@/shared/utils/cookiesHelper";
import { login } from "../api/auth.api";

export const useLoginQuery = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (res) => {
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      saveTokenToCookie(accessToken, refreshToken);
      navigate({ to: ROUTES.HOME });
      toast.success("Đăng nhập thành công");
    },
    onError: (error: any) => {
      if (error.code === 400) {
        toast.error("Email hoặc mật khẩu không đúng");
      } else {
        toast.error(error.message || "Đã xảy ra lỗi");
      }
    },
  });
};

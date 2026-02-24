import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm } from "@/components/features/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoginQuery } from "@/services/queries/auth.query";
import { ROUTES, TOKEN } from "@/shared/constants";
import { getTokenFromCookie } from "@/shared/utils/cookiesHelper";
import { useMeta } from "@/shared/hooks/useMeta.hook";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const accessToken = getTokenFromCookie(TOKEN.ACCESS);

    if (accessToken) {
      throw redirect({
        to: ROUTES.HOME,
      });
    }
  },
});

export default function LoginPage() {
  useMeta({ title: "Đăng nhập" });

  const { mutateAsync: login, isPending: isLoading } = useLoginQuery();

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="border border-gray-200 shadow-sm p-8 w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-center mb-6">
              <img
                src="/icon_app.svg"
                alt="Thai At logo"
                className="h-16 rounded w-auto"
              />
            </div>

            <h1 className="text-center text-2xl font-bold text-gray-900">
              Quản trị viên
            </h1>
          </CardTitle>
          <CardDescription className="text-center">
            Đăng nhập để quản lý nội dung Thái Ất Tử Vi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm onSubmit={login} loading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}

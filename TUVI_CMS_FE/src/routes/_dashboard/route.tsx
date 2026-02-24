import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AdminLayout } from "@/components/layout/admin/layout";
import { getTokenFromCookie } from "@/shared/utils/cookiesHelper";
import { TOKEN } from "@/shared/constants";
import { ROUTES } from "@/shared/constants";

export const Route = createFileRoute("/_dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    const accessToken = getTokenFromCookie(TOKEN.ACCESS);
    
    if (!accessToken) {
      throw redirect({
        to: ROUTES.AUTH.LOGIN,
      });
    }
  },
});

function RouteComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

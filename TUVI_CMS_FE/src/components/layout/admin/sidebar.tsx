import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useEffect, useState, type FC } from "react";

import { removeTokensFromCookie } from "@/shared/utils/cookiesHelper";
import { ROUTES } from "@/shared/constants";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { items, type SidebarItem } from "./constants";
import { getPageInfo } from "@/shared/utils/common";

export const AdminSidebar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState<SidebarItem>();

  useEffect(() => {
    const currentItem = getPageInfo(location.pathname);
    setSelectedItem(currentItem);
  }, [location.pathname]);

  const handleLogout = () => {
    removeTokensFromCookie();
    navigate({ to: ROUTES.AUTH.LOGIN });
  };

  return (
    <Sidebar className="bg-white!">
      <SidebarHeader className="bg-white">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-medium">
            <img
              src="/icon_app.svg"
              alt="Thai At logo"
              className="h-9 rounded w-auto"
            />
            Quản trị
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.url === selectedItem?.url}
                    asChild
                  >
                    <Link to={item.url} className="flex gap-6 pl-6 font-medium">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white">
        <SidebarMenuButton
          variant="default"
          onClick={handleLogout}
          className="flex gap-4 pl-6 text-red-600 cursor-pointer"
        >
          <LogOut /> Đăng xuất
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

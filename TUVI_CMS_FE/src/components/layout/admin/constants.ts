import { ChartColumn, FileText, LayoutDashboard, Settings, Users } from "lucide-react";

import { ROUTES } from "@/shared/constants";

export interface SidebarItem {
  title: string;
  url: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  heading?: string;
  description?: string;
}

export const items: SidebarItem[] = [
  {
    title: "Tổng quan",
    url: ROUTES.HOME,
    icon: LayoutDashboard,
    heading: "Tổng quan hệ thống",
    description: "Thống kê và quản lý nội dung Thái Ất Tử Vi",
  },
  {
    title: "Dự đoán",
    url: ROUTES.PREDICTIONS,
    icon: FileText,
    heading: "Quản lý Dự đoán",
    description: "Tạo, chỉnh sửa và quản lý các dự đoán",
  },
  {
    title: "Người dùng",
    url: ROUTES.USERS,
    icon: Users,
    heading: "Quản lý Người dùng",
    description: "Thêm, sửa và quản lý người dùng",
  },
  {
    title: "Thống kê",
    url: ROUTES.STATISTICS,
    icon: ChartColumn,
    heading: "Thống kê & Phân tích",
    description: "Báo cáo chi tiết về dự đoán và người dùng",
  },
  {
    title: "Cài đặt",
    url: ROUTES.CONFIGS,
    icon: Settings,
    heading: "Cài đặt",
    description: "Cấu hình các thiết lập chung cho app.",
  }
];

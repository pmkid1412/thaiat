import { Crown, Users } from "lucide-react";
import type { FC } from "react";

import type { UserOverview } from "@/services/types";
import { StatCard } from "./StatCard";

interface UsersOverviewProps {
  data?: UserOverview;
}

export const UsersOverview: FC<UsersOverviewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard
        label="Tổng người dùng"
        value={data?.totalUsers || 0}
        icon={<Users size={28} />}
        color="text-blue-600 bg-blue-100"
      />
      <StatCard
        label="Free"
        value={data?.freeUsers || 0}
        icon={<Users size={28} />}
        color="text-gray-600 bg-gray-100"
      />
      <StatCard
        label="Pro"
        value={data?.proUsers || 0}
        icon={<Crown size={28} />}
        color="text-purple-600 bg-purple-100"
      />
    </div>
  );
};

import { useQuery } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import { predictionKeys } from "@/services/queries/prediction.query";
import { useUsersOverviewQuery } from "@/services/queries/user.query";

export const PredictionStats = () => {
  const userOverview = useUsersOverviewQuery();
  const predictionOverview = useQuery(predictionKeys.getPredictionOverview());

  const stats = [
    {
      name: "Tổng dự đoán",
      value: predictionOverview.data?.total ?? 0,
    },
    {
      name: "Độ tin cậy trung bình",
      value: `${predictionOverview.data?.averageConfidence.toLocaleString("en-US", { maximumFractionDigits: 2 }) ?? 0}%`,
    },
    {
      name: "Tỷ lệ chính xác",
      value: `${predictionOverview.data?.accuracy.toLocaleString("en-US", { maximumFractionDigits: 2 }) ?? 0}%`,
    },
    {
      name: "Người dùng có lá số",
      value: userOverview.data?.birthChartUsers ?? 0,
    },
  ];

  return (
    <Card className="py-0">
      <CardContent>
        <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-6  sm:px-6 xl:px-8"
            >
              <dt className="text-sm/6 font-medium text-gray-500">
                {stat.name}
              </dt>

              <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>{" "}
      </CardContent>
    </Card>
  );
};

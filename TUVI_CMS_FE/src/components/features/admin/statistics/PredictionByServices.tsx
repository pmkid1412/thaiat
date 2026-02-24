import { type FC } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useUsersOverviewQuery } from "@/services/queries/user.query";

const RADIAN = Math.PI / 180;

export const PredictionsByServices: FC = () => {
  const { data: userData } = useUsersOverviewQuery();

  const data = [
    {
      name: "Free",
      value: userData?.freeUsers ?? 0,
      percentage: Math.round(
        ((userData?.freeUsers ?? 0) / (userData?.totalUsers ?? 1)) * 100
      ),
      color: "var(--color-slate-300)",
    },
    {
      name: "Pro",
      value: userData?.proUsers ?? 0,
      percentage: Math.round(
        ((userData?.proUsers ?? 0) / (userData?.totalUsers ?? 1)) * 100
      ),
      color: "var(--color-purple-600)",
    },
  ];

  const displayData = data?.map((item) => ({
    ...item,
    value: item.value === 0 ? 0.001 : item.value, // Small value to show in pie
  }));

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
    color,
    payload,
  }: {
    cx: number;
    cy: number;
    midAngle?: number;
    innerRadius: number;
    outerRadius: number;
    percent?: number;
    name?: string;
    color?: string;
    payload?: { percentage: number };
  }) => {
    const radius = outerRadius + 10;
    const midAngleValue = midAngle ?? 0;
    const x = cx + radius * Math.cos(-midAngleValue * RADIAN);
    const y = cy + radius * Math.sin(-midAngleValue * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={name === "Free" ? "var(--color-zinc-700)" : color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${name}: ${payload?.percentage ?? 0}%`}
      </text>
    );
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Gói dịch vụ</CardTitle>
        <CardDescription className="text-muted-foreground">
          Phân bố người dùng theo gói
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              predictionCount: {
                label: "Số lượng",
                color: "#8b5cf6",
              },
            } satisfies ChartConfig
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <>
                        Số lượng: <b>{value}</b>
                      </>
                    )}
                    hideLabel
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

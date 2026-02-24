import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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
import { predictionKeys } from "@/services/queries/prediction.query";

export const PredictionsByConfidence: FC = () => {
  const { data } = useQuery(predictionKeys.getPredictionStatsByConfidence());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Phân bố độ tin cậy
        </CardTitle>
        <CardDescription>Số lượng dự đoán theo mức độ tin cậy</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={
            {
              predictionCount: {
                label: "Số lượng",
                color: "var(--color-primary)",
              },
            } satisfies ChartConfig
          }
        >
          <ResponsiveContainer>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={true} strokeDasharray="3 3" />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <XAxis
                dataKey="confidenceRange"
                tickLine={false}
                axisLine={false}
                interval={0}
                height={80}
                tick={{ fontSize: 12 }}
                color="#000"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="predictionCount"
                fill="var(--color-predictionCount)"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

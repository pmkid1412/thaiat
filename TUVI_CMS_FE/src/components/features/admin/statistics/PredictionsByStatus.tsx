import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardAction,
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
import { useQuery } from "@tanstack/react-query";
import { predictionKeys } from "@/services/queries/prediction.query";
import type { SelectOption } from "@/components/form/SelectField";
import { useState, type FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const colorMap: Record<number, string> = {
  0: "var(--color-purple-600)",
  1: "var(--color-green-600)",
  2: "var(--color-red-600)",
  3: "var(--color-blue-600)",
};

const RADIAN = Math.PI / 180;

interface PredictionStatusData {
  languages?: SelectOption[];
}

export const PredictionsByStatus: FC<PredictionStatusData> = ({
  languages,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages?.[0]?.value
  );

  const { data: predictionData } = useQuery(
    predictionKeys.getPredictionStatsByStatus(
      selectedLanguage || languages?.[0]?.value
    )
  );

  const total =
    predictionData?.reduce((sum, item) => sum + item.predictionCount, 0) || 0;

  const data = predictionData?.map((item, index) => ({
    name: item.statusName,
    value: item.predictionCount,
    percentage:
      total > 0 ? Math.round((item.predictionCount / total) * 100) : 0,
    color: colorMap[index] || "#94a3b8",
  }));

  // Chỉ hiển thị các trạng thái có dữ liệu
  const displayData = data?.filter((item) => item.value > 0);

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
    // Ẩn label nếu percentage là 0
    if (!payload?.percentage || payload.percentage === 0) {
      return null;
    }

    const radius = outerRadius + 10;
    const midAngleValue = midAngle ?? 0;
    const x = cx + radius * Math.cos(-midAngleValue * RADIAN);
    const y = cy + radius * Math.sin(-midAngleValue * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${name}: ${payload.percentage}%`}
      </text>
    );
  };

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(Number(langId));
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Phân bố trạng thái
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Tỷ lệ các trạng thái dự đoán
        </CardDescription>

        <CardAction>
          <Tabs
            defaultValue={
              languages?.[0]?.value ? String(languages?.[0]?.value) : "1"
            }
            onValueChange={handleLanguageChange}
            className="w-fit"
          >
            <TabsList>
              {languages?.map((lang) => (
                <TabsTrigger key={lang.value} value={String(lang.value)}>
                  {lang.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardAction>
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
                {displayData?.map((entry, index) => (
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

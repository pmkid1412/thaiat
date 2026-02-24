import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import type { SelectOption } from "@/components/form/SelectField";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { predictionKeys } from "@/services/queries/prediction.query";

interface PredictionsByDomainProps {
  languages?: SelectOption[];
}

export const PredictionsByDomain: FC<PredictionsByDomainProps> = ({
  languages,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages?.[0]?.value
  );

  const { data } = useQuery(
    predictionKeys.getPredictionStatsByDomain(
      selectedLanguage || languages?.[0]?.value
    )
  );

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(Number(langId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Phân bố theo lĩnh vực
        </CardTitle>
        <CardDescription>Số lượng dự đoán theo từng lĩnh vực</CardDescription>

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
                color: "var(--color-purple-600)",
              },
            } satisfies ChartConfig
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={true} strokeDasharray="3 3" />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <XAxis
                dataKey="domainName"
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{ fontSize: 12 }}
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

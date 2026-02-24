import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle,
  CircleAlert,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { commonKeys } from "@/services/queries/common.query";
import { predictionKeys } from "@/services/queries/prediction.query";
import { useUsersOverviewQuery } from "@/services/queries/user.query";
import { useMeta } from "@/shared/hooks/useMeta.hook";

export const Route = createFileRoute("/_dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  useMeta({ title: "Tổng quan" });
  const getPredictionOverview = useQuery(
    predictionKeys.getPredictionOverview()
  );
  const getUserOverview = useUsersOverviewQuery();
  const getLanguages = useQuery(commonKeys.getLanguages());
  const [selectedLanguage, setSelectedLanguage] = useState<number>();
  const getRecentPredictions = useQuery(
    predictionKeys.getRecentPredictions(
      selectedLanguage || getLanguages.data?.[0]?.value
    )
  );

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(Number(langId));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-sm">Tổng dự đoán</h2>
            <FileText size={16} className="text-gray-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-black">
              {getPredictionOverview.data?.total}
            </p>
            <p className="text-xs text-gray-600">
              {getPredictionOverview.data?.active} đang hoạt động
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-sm">Đã xảy ra</h2>
            <CheckCircle size={16} className="text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-black">
              {getPredictionOverview.data?.occurred}
            </p>
            <p className="text-xs text-gray-600">Dự đoán chính xác</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-sm">Độ chính xác</h2>
            <TrendingUp size={16} className="text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-black">
              {getPredictionOverview.data?.accuracy.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
              %
            </p>
            <p className="text-xs text-gray-600">Tỷ lệ thành công</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-sm">Người dùng</h2>
            <Users size={16} className="text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-black">
              {getUserOverview.data?.totalUsers}
            </p>
            <p className="text-xs text-gray-600">Tài khoản đăng ký</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Dự đoán gần đây</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            5 dự đoán gần nhất trong hệ thống
          </CardDescription>

          <CardAction>
            <Tabs
              defaultValue={
                getLanguages.data?.[0]?.value
                  ? String(getLanguages.data?.[0]?.value)
                  : "1"
              }
              onValueChange={handleLanguageChange}
              className="w-fit"
            >
              <TabsList>
                {getLanguages.data?.map((lang) => (
                  <TabsTrigger
                    key={lang.value}
                    value={String(lang.value)}
                    onClick={() => setSelectedLanguage(lang.value)}
                  >
                    {lang.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {getRecentPredictions.isLoading ? (
            <div className="flex justify-center p-20">
              <Spinner className="size-8" />
            </div>
          ) : getRecentPredictions.data?.length === 0 ? (
            <p className="text-sm text-center py-4">Không có kết quả.</p>
          ) : (
            getRecentPredictions.data?.map((prediction) => (
              <div
                key={prediction.id}
                className="flex space-x-2 justify-between border-b last:border-b-0 pb-4"
              >
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full mt-2 bg-primary shrink-0" />
                  <div>
                    <h4
                      className="max-w-4xl line-clamp-2"
                      title={prediction.title}
                    >
                      {prediction.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {prediction.domainName} • {prediction.areas.join(", ")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(prediction.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant="secondary" className="text-primary">
                    Dự đoán
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {prediction.confidenceScore}%
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="font-medium">Lưu ý</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <CircleAlert size={16} className="text-orange-500" />
            <div>
              <p className="text-sm leading-[100%] font-medium text-gray-700">
                Có {getPredictionOverview.data?.active || 0} dự đoán đang hoạt
                động cần theo dõi và cập nhật trạng thái.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

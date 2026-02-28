import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMeta } from "@/shared/hooks/useMeta.hook";

import {
  columns,
  ConfigEditDialog,
  ConfigList,
} from "@/components/features/admin/configs/list";
import { ProviderSelector } from "@/components/features/admin/configs/ProviderSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { configKeys } from "@/services/queries/config.query";
import type { ConfigItem } from "@/services/types";
import { Bot, MonitorCog, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_dashboard/configs")({
  component: RouteComponent,
});

const AI_PROVIDER_CODES = ["AI_API_KEY", "OPENAI_API_KEY", "AI_PROVIDER_DEFAULT"];
const DUMMY_DATA_CODE = "DUMMY_DATA_ENABLED";

function RouteComponent() {
  useMeta({ title: "Cài đặt" });
  const queryClient = useQueryClient();
  const { data: configs, isLoading } = useQuery(configKeys.list());
  const { mutateAsync: updateConfig, isPending: isUpdating } = useMutation(
    configKeys.update()
  );
  const { mutateAsync: uploadConfigFile, isPending: isUploading } = useMutation(
    configKeys.uploadFile()
  );

  const [editingConfig, setEditingConfig] = useState<ConfigItem | null>(null);

  const handleEdit = (config: ConfigItem) => {
    setEditingConfig(config);
  };

  const handleSave = async (code: string, value: string) => {
    await updateConfig({ code, value });
    queryClient.invalidateQueries({ queryKey: configKeys.all });
    setEditingConfig(null);
  };

  const handleSaveFile = async (code: string, file: File) => {
    await uploadConfigFile({ code, file });
    queryClient.invalidateQueries({ queryKey: configKeys.all });
    setEditingConfig(null);

    // Auto-reload investment microservice data if uploading investment config
    if (code.startsWith("INVESTMENT_TOOL_")) {
      try {
        const { reloadInvestmentData } = await import("@/services/api/config.api");
        await reloadInvestmentData();
        const { toast } = await import("sonner");
        toast.success("Dữ liệu đầu tư đã được reload tự động");
      } catch {
        const { toast } = await import("sonner");
        toast.warning("Upload thành công, nhưng reload tự động thất bại. Vui lòng restart microservice.");
      }
    }
  };

  const handleProviderSwitch = async (provider: string) => {
    await updateConfig({ code: "AI_PROVIDER_DEFAULT", value: provider });
    queryClient.invalidateQueries({ queryKey: configKeys.all });
  };

  // Dummy data toggle
  const dummyConfig = configs?.find((c) => c.code === DUMMY_DATA_CODE);
  const isDummyEnabled = dummyConfig?.value === "true";
  const handleDummyToggle = async (checked: boolean) => {
    await updateConfig({
      code: DUMMY_DATA_CODE,
      value: checked ? "true" : "false",
    });
    queryClient.invalidateQueries({ queryKey: configKeys.all });
  };

  // Filter configs into sections
  const normalConfigs =
    configs?.filter(
      (config) =>
        !config.code.startsWith("INVESTMENT_TOOL_") &&
        !AI_PROVIDER_CODES.includes(config.code) &&
        config.code !== DUMMY_DATA_CODE
    ) || [];
  const aiProviderConfigs =
    configs?.filter((config) => AI_PROVIDER_CODES.includes(config.code)) || [];
  const aiProviderKeyConfigs =
    aiProviderConfigs.filter((config) => config.code !== "AI_PROVIDER_DEFAULT") || [];
  const currentProvider =
    aiProviderConfigs.find((c) => c.code === "AI_PROVIDER_DEFAULT")?.value || "gemini";
  const investmentConfigs =
    configs?.filter((config) => config.code.startsWith("INVESTMENT_TOOL_")) || [];

  return (
    <div className="space-y-6">
      {/* System Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 font-medium">
            <MonitorCog size={18} className="text-muted-foreground" /> Cấu hình
            hệ thống
          </CardTitle>
          <CardDescription>Quản lý các cấu hình của hệ thống</CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="size-8" />
            </div>
          ) : (
            <ConfigList
              columns={columns}
              data={normalConfigs || []}
              onEdit={handleEdit}
            />
          )}
        </CardContent>
      </Card>

      {/* Apple Review — Dummy Data Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 font-medium">
            <ShieldCheck size={18} className="text-muted-foreground" /> Apple
            Review Mode
          </CardTitle>
          <CardDescription>
            Bật chế độ dummy để vượt Apple review — tử vi trả về nội dung chung
            chung
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="size-8" />
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Chế độ Dummy Data</p>
                <p className="text-xs text-muted-foreground">
                  Khi bật, API tử vi trả về lời khuyên sống tích cực thay vì
                  phân tích tử vi thật
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={isDummyEnabled ? "default" : "secondary"}
                  className={
                    isDummyEnabled
                      ? "bg-amber-500 hover:bg-amber-500"
                      : ""
                  }
                >
                  {isDummyEnabled ? "ĐANG BẬT" : "TẮT"}
                </Badge>
                <Switch
                  checked={isDummyEnabled}
                  onCheckedChange={handleDummyToggle}
                  disabled={isUpdating}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Provider Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 font-medium">
            <Sparkles size={18} className="text-muted-foreground" /> Quản lý AI
            Provider
          </CardTitle>
          <CardDescription>
            Gemini (chính) &amp; OpenAI (backup) — tự động chuyển khi gặp lỗi
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="size-8" />
            </div>
          ) : (
            <>
              <ProviderSelector
                currentProvider={currentProvider}
                configs={aiProviderConfigs}
                onSwitch={handleProviderSwitch}
                isPending={isUpdating}
              />
              <div className="-mx-6">
                <ConfigList
                  columns={columns}
                  data={aiProviderKeyConfigs}
                  onEdit={handleEdit}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Investment AI Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 font-medium">
            <Bot size={18} className="text-muted-foreground" /> Cấu hình AI
            Thiên cơ
          </CardTitle>
          <CardDescription>
            Quản lý các cấu hình cho tính năng "Tư vấn Đầu tư &amp; AI Expert"
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="size-8" />
            </div>
          ) : (
            <ConfigList
              columns={columns}
              data={investmentConfigs || []}
              onEdit={handleEdit}
            />
          )}
        </CardContent>
      </Card>

      <ConfigEditDialog
        config={editingConfig}
        open={!!editingConfig}
        isPending={isUpdating || isUploading}
        onOpenChange={(open) => !open && setEditingConfig(null)}
        onSave={handleSave}
        onSaveFile={handleSaveFile}
      />
    </div>
  );
}


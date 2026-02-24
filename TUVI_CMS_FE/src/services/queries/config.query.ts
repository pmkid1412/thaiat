import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { getConfigs, updateConfig, uploadConfigFile } from "../api/config.api";
import { toast } from "sonner";

export const configKeys = {
  all: ["configs"] as const,
  list: () => queryOptions({
    queryKey: [...configKeys.all, "list"] as const,
    queryFn: getConfigs,
  }),
  update: () => mutationOptions({
    mutationKey: [...configKeys.all, "update"] as const,
    mutationFn: updateConfig,
    onSuccess: () => {
      toast.success('Cập nhật cấu hình thành công')
    }
  }),
  uploadFile: () => mutationOptions({
    mutationKey: [...configKeys.all, "uploadFile"] as const,
    mutationFn: uploadConfigFile,
    onSuccess: () => {
      toast.success('Tải file lên thành công')
    }
  }),
};
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/form/TextField";
import TextareaField from "@/components/form/TextareaField";
import { FileUploadField } from "@/components/form/FileUploadField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import type { ConfigItem } from "@/services/types";
import {
  configFormSchema,
  configFileFormSchema,
  type ConfigFormData,
  type ConfigFileFormData,
} from "@/shared/schemas/config.schema";

interface ConfigEditDialogProps {
  config: ConfigItem | null;
  open: boolean;
  isPending?: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (code: string, value: string) => void;
  onSaveFile: (code: string, file: File) => void;
}

export function ConfigEditDialog({
  config,
  open,
  isPending,
  onOpenChange,
  onSave,
  onSaveFile,
}: ConfigEditDialogProps) {
  const isFileType = config?.valueType === "file";

  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      value: "",
    },
  });

  const fileForm = useForm<ConfigFileFormData>({
    resolver: zodResolver(configFileFormSchema),
    defaultValues: {
      file: null,
    },
  });

  useEffect(() => {
    if (config) {
      if (isFileType) {
        fileForm.reset({ file: null });
      } else {
        form.reset({ value: config.value });
      }
    }
  }, [config, form, fileForm, isFileType]);

  const handleSubmit = (data: ConfigFormData) => {
    if (!config) return;
    onSave(config.code, data.value);
  };

  const handleFileSubmit = (data: ConfigFileFormData) => {
    if (!config || !data.file) return;
    onSaveFile(config.code, data.file);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      fileForm.reset();
    }
    onOpenChange(isOpen);
  };

  const isLongText =
    (config?.value?.length ?? 0) > 50 || config?.valueType === "text";

  const getFileNameFromPath = (path: string) => {
    return path.split("/").pop() || path;
  };

  if (isFileType) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa cấu hình</DialogTitle>
            <DialogDescription>{config?.name}</DialogDescription>
          </DialogHeader>
          <Form {...fileForm}>
            <form
              onSubmit={fileForm.handleSubmit(handleFileSubmit)}
              className="space-y-4 py-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Mô tả</label>
                <p className="text-sm text-muted-foreground">
                  {config?.description || "Không có mô tả"}
                </p>
              </div>

              <FileUploadField
                required
                control={fileForm.control}
                name="file"
                label="File"
                accept=".csv"
                currentFileName={config?.value ? getFileNameFromPath(config.value) : undefined}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={isPending || !fileForm.formState.isDirty}>
                  {isPending && <Spinner />}
                  Tải lên
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa cấu hình</DialogTitle>
          <DialogDescription>{config?.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Mô tả</label>
              <p className="text-sm text-muted-foreground">
                {config?.description || "Không có mô tả"}
              </p>
            </div>

            {isLongText ? (
              <TextareaField
                required
                control={form.control}
                name="value"
                label="Giá trị"
                placeholder="Nhập giá trị..."
                rows={4}
              />
            ) : (
              <TextField
                required
                control={form.control}
                name="value"
                label="Giá trị"
                placeholder="Nhập giá trị..."
                type={config?.valueType === "number" ? "number" : "text"}
              />
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isPending || !form.formState.isDirty}>
                {isPending && <Spinner />}
                Cập nhật
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

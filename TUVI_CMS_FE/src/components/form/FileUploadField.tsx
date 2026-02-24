import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useCallback, useState } from "react";
import { FileUp, X, File } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  required?: boolean;
  control: Control<TFieldValues>;
  label: string;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  currentFileName?: string;
}

export const FileUploadField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  required,
  control,
  label,
  accept = ".csv",
  maxSize,
  disabled,
  className,
  currentFileName,
}: FileUploadFieldProps<TFieldValues, TName>) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => {
        const file = value as File | null;

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(false);

          if (disabled) return;

          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile) {
            if (maxSize && droppedFile.size > maxSize) {
              return;
            }
            onChange(droppedFile);
          }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            if (maxSize && selectedFile.size > maxSize) {
              return;
            }
            onChange(selectedFile);
          }
        };

        const handleRemove = () => {
          onChange(null);
        };

        return (
          <FormItem className={className}>
            <FormLabel>
              {label}
              {required && <span className="text-destructive -ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <div className="space-y-3 max-w-full">
                {currentFileName && !file && (
                  <div className="flex items-center gap-1 rounded-md border border-border bg-muted/50 p-3 overflow-hidden">
                    <File className="size-4 text-muted-foreground shrink-0" />
                    <div className="text-sm text-muted-foreground min-w-0 flex items-center gap-1">
                      <span className="shrink-0">File hiện tại:</span>
                      <span
                        title={currentFileName}
                        className="font-medium line-clamp-1 text-gray-700"
                      >
                        {currentFileName}
                      </span>
                    </div>
                  </div>
                )}

                {file ? (
                  <div className="flex justify-between gap-2 rounded-md border border-border bg-muted/20 p-3 overflow-hidden max-w-full">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 shrink-0">
                        <File className="size-5 text-primary" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span
                          title={file.name}
                          className="text-sm font-medium line-clamp-1"
                        >
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive/90 shrink-0"
                      onClick={handleRemove}
                      disabled={disabled}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
                      isDragOver
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <FileUp className="mb-2 size-8 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Kéo thả file vào đây hoặc click để chọn
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Hỗ trợ {accept}{" "}
                      {maxSize && ` (Tối đa ${formatFileSize(maxSize)})`}
                    </span>
                    <input
                      {...field}
                      type="file"
                      accept={accept}
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={disabled}
                    />
                  </label>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

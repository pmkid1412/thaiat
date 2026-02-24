import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";

import { DateField } from "@/components/form/DateField";
import SliderField from "@/components/form/SliderField";
import TextareaField from "@/components/form/TextareaField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import {
  DEFAULT_VALUES,
  evidenceFormSchema,
  type EvidenceFormData,
} from "@/shared/schemas/evidence.schema";

interface EvidenceFormProps {
  defaultValues?: Partial<EvidenceFormData>;
  loading?: boolean;
  mode: "add" | "edit";
  onSubmit: (data: EvidenceFormData) => Promise<void>;
  onCancel?: () => void;
}

export const EvidenceForm: FC<EvidenceFormProps> = ({
  defaultValues = DEFAULT_VALUES,
  loading,
  mode,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<EvidenceFormData>({
    resolver: zodResolver(evidenceFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues && mode === "edit") {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, mode]);

  const handleSubmit = async (data: EvidenceFormData) => {
    await onSubmit(data);
    form.reset(DEFAULT_VALUES);
  };

  const handleCancel = () => {
    form.reset(DEFAULT_VALUES);
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FieldSet>
          <FieldLegend>
            {mode === "add" ? "Thêm dẫn chứng mới" : "Chỉnh sửa dẫn chứng"}
          </FieldLegend>

          <FieldGroup>
            <div className="grid grid-cols-2 gap-4 items-start">
              <TextField
                control={form.control}
                name="title"
                label="Tiêu đề"
                placeholder="Nhập tiêu đề dẫn chứng"
                required
              />

              <TextField
                control={form.control}
                name="source"
                label="Nguồn"
                placeholder="VD: VnExpress, Tuổi trẻ..."
              />
            </div>

            <TextField
              control={form.control}
              name="link"
              label="Link bài viết"
              placeholder="https://..."
              required
            />

            <div className="grid grid-cols-2 gap-4 items-start">
              <DateField
                control={form.control}
                name="publishedDate"
                label="Ngày xuất bản"
              />

              <SliderField
                control={form.control}
                name="confidenceScore"
                label="Độ tin cậy"
                min={0}
                max={100}
                step={1}
              />
            </div>

            <TextareaField
              control={form.control}
              name="quote"
              label="Trích dẫn"
              placeholder="Trích dẫn ngắn từ bài viết..."
              rows={4}
            />
          </FieldGroup>
        </FieldSet>

        <div className="flex gap-2 justify-end pt-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
          )}
          <Button type="submit" disabled={!form.formState.isDirty || loading}>
            {loading && <Spinner />}Lưu dẫn chứng
          </Button>
        </div>
      </form>
    </Form>
  );
};

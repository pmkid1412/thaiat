import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type FC } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import { DateField } from "@/components/form/DateField";
import RadioGroupField from "@/components/form/RadioGroupField";
import { SelectField, type SelectOption } from "@/components/form/SelectField";
import SliderField from "@/components/form/SliderField";
import SwitchField from "@/components/form/SwitchField";
import { TagMultiSelectField } from "@/components/form/TagMultiSelectField";
import { TextEditorField } from "@/components/form/TextEditorField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { commonKeys } from "@/services/queries/common.query";
import type { CreatePredictionRequest } from "@/services/types/prediction.type";
import { PREDICTION_TYPES } from "@/shared/constants";
import { toCreatePredictionRequest } from "@/shared/mappers";
import {
  predictionFormSchema,
  type PredictionFormData,
} from "@/shared/schemas/prediction.schema";

interface PredictionFormProps {
  languageId?: number;
  languageOptions?: SelectOption[];
  loading?: boolean;
  defaultValues?: PredictionFormData;
  onSubmit: (data: CreatePredictionRequest) => Promise<void>;
}

export const PredictionForm: FC<PredictionFormProps> = ({
  languageId,
  languageOptions,
  loading,
  onSubmit,
  defaultValues,
}) => {
  const getDomainsQuery = useQuery(commonKeys.getDomains(languageId));
  const getImpactLevelsQuery = useQuery(commonKeys.getImpactLevels(languageId));
  const getPredictionStatusesQuery = useQuery(
    commonKeys.getPredictionStatuses(languageId)
  );
  const getAreasQuery = useQuery(commonKeys.getAreas(languageId));

  const form = useForm({
    resolver: zodResolver(predictionFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...defaultValues });
    }
  }, [defaultValues, form]);

  const savePublication = async (data: PredictionFormData) => {
    const dto = toCreatePredictionRequest(data);
    await onSubmit(dto);
    form.reset();
  };

  const handleError = (errors: FieldErrors<PredictionFormData>) => {
    if (
      Array.isArray(languageOptions) &&
      Array.isArray(errors.predictionData)
    ) {
      const activeLanguageIndex = languageOptions.findIndex(
        (lang) => lang.value === languageId
      );

      if (errors.predictionData[activeLanguageIndex]) return;

      const errorIndex = errors.predictionData.findIndex(Boolean);
      if (errorIndex !== -1 && errorIndex !== activeLanguageIndex) {
        toast.warning(
          `Vui lòng hoàn thành các trường bắt buộc cho ngôn ngữ ${languageOptions[errorIndex].label}`
        );
      }
    }
  };

  return (
    <Form {...form}>
      <form
        id="prediction-form"
        onSubmit={form.handleSubmit(savePublication, handleError)}
        className="flex flex-col gap-6"
      >
        <Card className="p-6 shadow-xs pb-8F">
          <FieldSet>
            <FieldLegend>Thông tin cơ bản</FieldLegend>

            <FieldGroup>
              {defaultValues?.predictionData.map((data, index) => (
                <div
                  key={data.languageId}
                  className={cn("flex-col gap-7", {
                    hidden: data.languageId !== languageId,
                    flex: data.languageId === languageId,
                  })}
                >
                  <TextField
                    control={form.control}
                    name={`predictionData.${index}.title`}
                    label="Tiêu đề"
                    required
                  />
                  <TextField
                    control={form.control}
                    name={`predictionData.${index}.summary`}
                    label="Tóm tắt"
                    required
                  />
                </div>
              ))}

              <div className="grid grid-cols-3 gap-4 items-start">
                <RadioGroupField
                  className="col-span-1"
                  control={form.control}
                  name="type"
                  label="Loại"
                  required
                  options={Object.values(PREDICTION_TYPES).map((status) => ({
                    value: status,
                    label: status,
                  }))}
                />

                <SwitchField
                  control={form.control}
                  name="isDraft"
                  label="Lưu nháp"
                  vertical
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                <DateField
                  control={form.control}
                  name="predictionDate"
                  label="Ngày dự đoán"
                  required
                />
                <DateField
                  control={form.control}
                  name="startDate"
                  label="Bắt đầu"
                />
                <DateField
                  control={form.control}
                  name="endDate"
                  label="Kết thúc"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                <SelectField
                  control={form.control}
                  name="domainId"
                  label="Lĩnh vực"
                  options={getDomainsQuery.data || []}
                  required
                />
                <SelectField
                  required
                  control={form.control}
                  name="impactLevelId"
                  label="Mức độ ảnh hưởng"
                  options={getImpactLevelsQuery.data || []}
                />
                <SelectField
                  required
                  control={form.control}
                  name="predictionStatusId"
                  label="Trạng thái"
                  options={getPredictionStatusesQuery.data || []}
                />
              </div>
            </FieldGroup>
          </FieldSet>
        </Card>

        {defaultValues?.predictionData?.map((data, index) => (
          <Card
            key={`rich-${data.languageId}`}
            className={
              data.languageId === languageId
                ? "p-6 shadow-xs block"
                : "p-6 shadow-xs hidden"
            }
          >
            <TextEditorField
              control={form.control}
              name={`predictionData.${index}.description`}
              label="Mô tả chi tiết"
              required
            />
          </Card>
        ))}

        <Card className="p-6 shadow-xs">
          <FieldSet>
            <FieldLegend>Thông tin bổ sung</FieldLegend>

            <FieldGroup>
              <TagMultiSelectField
                control={form.control}
                name="areas"
                label="Quốc gia"
                options={getAreasQuery.data || []}
                required
                description="Click vào để chọn các quốc gia trong danh sách"
              />
              <TextField
                control={form.control}
                name="tags"
                label="Tags (phân cách bằng dấu phẩy)"
                placeholder="tài chính, kinh tế, công nghệ"
              />
            </FieldGroup>
          </FieldSet>
        </Card>

        {/* Spacer for fixed footer */}
        <div className="h-10" />
      </form>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-background/95 backdrop-blur-sm border-t flex justify-end gap-4 z-45">
        <Button
          type="submit"
          form="prediction-form"
          disabled={!form.formState.isDirty || loading}
        >
          {loading && <Spinner />}
          Lưu dự đoán
        </Button>
      </div>
    </Form>
  );
};

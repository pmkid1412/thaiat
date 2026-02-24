import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { PredictionForm } from "@/components/features/admin/predictions/new/PredictionForm";
import { Breadcrumb } from "@/components/features/common/Breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { commonKeys } from "@/services/queries/common.query";
import { predictionKeys } from "@/services/queries/prediction.query";
import type { CreatePredictionRequest } from "@/services/types/prediction.type";
import { PREDICTION_TYPES, ROUTES } from "@/shared/constants";
import { useMeta } from "@/shared/hooks/useMeta.hook";

export const Route = createFileRoute("/_dashboard/predictions/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  useMeta({ title: "Thêm dự đoán" });

  const languages = useQuery(commonKeys.getLanguages());
  const [activeLanguage, setActiveLanguage] = useState<number>(0);

  useEffect(() => {
    if (languages.data && languages.data.length > 0) {
      setActiveLanguage(languages.data?.[0]?.value);
    }
  }, [languages.data]);

  const createPredictionMutation = useMutation(
    predictionKeys.createPrediction()
  );
  const queryClient = useQueryClient();

  const handleSubmit = async (data: CreatePredictionRequest) => {
    await createPredictionMutation.mutateAsync(data);
    queryClient.invalidateQueries({ queryKey: ["predictions"] });
    navigate({ to: ROUTES.PREDICTIONS });
  };

  const defaultFormValues = useMemo(
    () => ({
      predictionDate: "",
      domainId: "",
      confidenceScore: 50,
      predictionStatusId: "",
      impactLevelId: "",
      areas: [],
      tags: "",
      type: PREDICTION_TYPES.FREE,
      isDraft: false,
      predictionData:
        languages.data?.map((lang) => ({
          languageId: lang.value,
          title: "",
          summary: "",
          description: "",
        })) || [],
    }),
    [languages.data]
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[
            {
              label: "Danh sách dự đoán",
              href: ROUTES.PREDICTIONS,
            },
            {
              label: "Thêm dự đoán",
              isCurrent: true,
            },
          ]}
        />
        <Tabs
          value={String(activeLanguage)}
          onValueChange={(v) => setActiveLanguage(Number(v))}
          className="w-fit"
        >
          <TabsList>
            {languages.data?.map((lang) => (
              <TabsTrigger key={lang.value} value={String(lang.value)}>
                {lang.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-2">
        <PredictionForm
          languageId={activeLanguage}
          languageOptions={languages.data}
          onSubmit={handleSubmit}
          loading={createPredictionMutation.isPending}
          defaultValues={defaultFormValues}
        />
      </div>
    </div>
  );
}

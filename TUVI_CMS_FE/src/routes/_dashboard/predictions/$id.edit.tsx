import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { PredictionForm } from "@/components/features/admin/predictions/new/PredictionForm";

import { Breadcrumb } from "@/components/features/common/Breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { commonKeys } from "@/services/queries/common.query";
import { predictionKeys } from "@/services/queries/prediction.query";
import type {
  CreatePredictionRequest,
  PredictionDetails,
} from "@/services/types/prediction.type";
import { ROUTES } from "@/shared/constants";
import { useMeta } from "@/shared/hooks/useMeta.hook";
import { toPredictionFormData } from "@/shared/mappers/prediction.mapper";

export const Route = createFileRoute("/_dashboard/predictions/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  useMeta({ title: "Chỉnh sửa dự đoán" });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = Route.useParams();
  const predictionId = Number(id);

  const predictionQuery = useQuery(
    predictionKeys.getDetailsByLanguageId(predictionId)
  );
  const updatePredictionMutation = useMutation(
    predictionKeys.updatePrediction()
  );
  const languages = useQuery(commonKeys.getLanguages());

  const [activeLanguage, setActiveLanguage] = useState(
    languages.data?.[0]?.value
  );

  useEffect(() => {
    if (languages.data && languages.data.length > 0) {
      setActiveLanguage(languages.data?.[0]?.value);
    }
  }, [languages.data]);

  const defaultValues = useMemo(() => {
    const p = predictionQuery.data as PredictionDetails | undefined;
    if (!p) return undefined;

    return toPredictionFormData(p, languages.data);
  }, [languages.data, predictionQuery.data]);

  const handleSubmit = async (data: CreatePredictionRequest) => {
    await updatePredictionMutation.mutateAsync({ id: predictionId, data });
    queryClient.invalidateQueries({ queryKey: ["predictions"] });
    navigate({ to: ROUTES.PREDICTIONS });
  };


  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[
            {
              label: "Danh sách dự đoán",
              href: ROUTES.PREDICTIONS,
            },
            {
              label: "Chỉnh sửa dự đoán",
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
      {defaultValues ? (
        <PredictionForm
          languageId={activeLanguage}
          languageOptions={languages.data}
          defaultValues={defaultValues}
          loading={updatePredictionMutation.isPending}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <Spinner className="size-12" />
        </div>
      )}
    </div>
  );
}

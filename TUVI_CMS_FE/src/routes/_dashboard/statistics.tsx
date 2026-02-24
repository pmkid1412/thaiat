import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMeta } from "@/shared/hooks/useMeta.hook";

import { PredictionsByServices } from "@/components/features/admin/statistics/PredictionByServices";
import { PredictionsByConfidence } from "@/components/features/admin/statistics/PredictionsByConfidence";
import { PredictionsByDomain } from "@/components/features/admin/statistics/PredictionsByDomain";
import { PredictionsByStatus } from "@/components/features/admin/statistics/PredictionsByStatus";
import { PredictionStats } from "@/components/features/admin/statistics/PredictionStats";
import { commonKeys } from "@/services/queries/common.query";

export const Route = createFileRoute("/_dashboard/statistics")({
  component: RouteComponent,
});

function RouteComponent() {
  useMeta({ title: "Thống kê" })

  const { data: languages } = useQuery(commonKeys.getLanguages());

  return (
    <div className="space-y-6">
      <PredictionStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionsByDomain languages={languages} />
        <PredictionsByStatus languages={languages} />
        <PredictionsByConfidence />
        <PredictionsByServices />
      </div>
    </div>
  );
}

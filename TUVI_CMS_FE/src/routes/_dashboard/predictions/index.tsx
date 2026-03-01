import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PredictionDetailsDialog } from "@/components/features/admin/predictions/details";
import { PredictionEvidenceDialog } from "@/components/features/admin/predictions/evidence";
import { columns } from "@/components/features/admin/predictions/list/columns";
import { PredictionList } from "@/components/features/admin/predictions/list/PredictionList";
import { PredictionSearchFilter } from "@/components/features/admin/predictions/search-filter";
import { Pagination } from "@/components/features/common/Pagination";
import { Card } from "@/components/ui/card";
import { ShareDialog } from "@/components/features/admin/predictions/share/ShareDialog";
import { commonKeys } from "@/services/queries/common.query";
import { predictionKeys } from "@/services/queries/prediction.query";
import type { PredictionSearchParams } from "@/services/types/prediction.type";
import { ROUTES } from "@/shared/constants";
import { useMeta } from "@/shared/hooks/useMeta.hook";

export const Route = createFileRoute("/_dashboard/predictions/")({
  component: RouteComponent,
});

function RouteComponent() {
  useMeta({ title: "Dự đoán" });
  const navigate = useNavigate();

  const deletePredictionMutation = useMutation(
    predictionKeys.deletePrediction()
  );
  const getLanguagesQuery = useQuery(commonKeys.getLanguages());

  useEffect(() => {
    if (getLanguagesQuery?.data?.[0]?.value) {
      setQueryParams((prev) => ({
        ...prev,
        languageId: getLanguagesQuery.data?.[0]?.value,
      }));
    }
  }, [getLanguagesQuery.data]);

  const handleDeletePrediction = async (id: number) => {
    await deletePredictionMutation.mutateAsync(id);
    predictions.refetch();
  };

  const [queryParams, setQueryParams] = useState<PredictionSearchParams>({
    page: 1,
    pageSize: 50,
    languageId: getLanguagesQuery.data?.[0]?.value,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [openEvidenceDialog, setOpenEvidenceDialog] = useState(false);
  const [openPredictionDialog, setOpenPredictionDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [selectedPredictionId, setSelectedPredictionId] = useState<number>();

  const predictions = useQuery(predictionKeys.getPredictions(queryParams));

  const handleEditPrediction = (id: number) => {
    navigate({ to: ROUTES.PREDICTIONS_EDIT, params: { id: String(id) } });
  };

  const handleOpenEvidenceDialog = (id: number) => {
    setSelectedPredictionId(id);
    setOpenEvidenceDialog(true);
  };

  const handleOpenPredictionDialog = (id: number) => {
    setSelectedPredictionId(id);
    setOpenPredictionDialog(true);
  };

  const handleShare = (id: number) => {
    setSelectedPredictionId(id);
    setOpenShareDialog(true);
  };

  return (
    <Card className="shadow-sm overflow-x-auto max-w-full py-5">
      <div className="px-4">
        <PredictionSearchFilter onChange={setQueryParams} />
      </div>

      <PredictionList
        columns={columns}
        data={predictions.data?.data || []}
        onEdit={handleEditPrediction}
        onDelete={handleDeletePrediction}
        onOpenEvidence={handleOpenEvidenceDialog}
        onOpenPrediction={handleOpenPredictionDialog}
        onShare={handleShare}
        loading={predictions.isLoading}
      />

      <Pagination
        totalPages={predictions.data?.totalPages || 0}
        currentPage={currentPage}
        totalItems={predictions.data?.total || 0}
        pageSize={predictions.data?.pageSize || queryParams.pageSize || 50}
        onPageChange={(page) => {
          setCurrentPage(page);
          setQueryParams((prev) => ({
            ...prev,
            page,
          }));
        }}
      />

      <PredictionDetailsDialog
        open={openPredictionDialog}
        onOpenChange={setOpenPredictionDialog}
        id={selectedPredictionId}
        languageId={queryParams.languageId}
      />

      <PredictionEvidenceDialog
        open={openEvidenceDialog}
        onOpenChange={setOpenEvidenceDialog}
        predictionId={selectedPredictionId}
      />

      <ShareDialog
        open={openShareDialog}
        onOpenChange={setOpenShareDialog}
        predictionId={selectedPredictionId}
      />
    </Card>
  );
}

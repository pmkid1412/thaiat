import type { SelectOption } from "@/components/form/SelectField";
import type {
  CreatePredictionRequest,
  PredictionDetails,
} from "@/services/types/prediction.type";
import { PREDICTION_STATUSES } from "../constants";
import type {
  PredictionDataFormData,
  PredictionFormData,
} from "../schemas/prediction.schema";

// Convert form data (already validated & normalized by zod) to API request DTO.
// Ensures date-only strings, trims tags, and keeps structure aligned with backend expectations.
export function toCreatePredictionRequest(
  data: PredictionFormData
): CreatePredictionRequest {
  return {
    predictionDate: data.predictionDate,
    startDate: data.startDate ?? undefined,
    endDate: data.endDate ?? undefined,
    domainId: Number(data.domainId),
    impactLevelId: Number(data.impactLevelId),
    predictionStatusId: Number(data.predictionStatusId),
    confidenceScore: data.confidenceScore,
    areas: data.areas,
    type: data.type,
    status: data.isDraft
      ? PREDICTION_STATUSES.DRAFT
      : PREDICTION_STATUSES.PUBLISHED,
    tags: data.tags?.trim() || "",
    predictionData: data.predictionData
      .filter((d) =>
        [d.title, d.summary, d.description].every(
          (v) => typeof v === "string" && v.trim().length > 0
        )
      )
      .map((d) => ({
        ...d,
        title: d.title!.trim(),
        summary: d.summary!.trim(),
        description: d.description!.trim(),
      })),
  };
}

export function toPredictionFormData(
  data: PredictionDetails,
  languages?: SelectOption[]
): PredictionFormData {
  // Extract unique area IDs from the areas array
  const areaIds = Array.from(
    new Set((data.areas || []).flat().map((a) => a.areaId))
  );

  let predictionData: PredictionDataFormData[] = data.predictionData;

  if (languages) {
    // Ensure all languages are represented in the form data
    const existingLangIds = new Set(
      data.predictionData.map((d) => d.languageId)
    );
    const missingLangs = languages.filter(
      (lang) => !existingLangIds.has(Number(lang.value))
    );
    const missingData = missingLangs.map((lang) => ({
      languageId: Number(lang.value),
      title: "",
      summary: "",
      description: "",
    }));
    predictionData = [...data.predictionData, ...missingData];
  }

  return {
    predictionDate: data.predictionDate,
    startDate: data.startDate ? data.startDate : undefined,
    endDate: data.endDate ? data.endDate : undefined,
    domainId: data.domainId.toString(),
    impactLevelId: data.impactLevelId.toString(),
    predictionStatusId: data.predictionStatusId.toString(),
    confidenceScore: data.confidenceScore,
    areas: areaIds,
    tags: (data.tags || []).join(", "),
    type: data.type,
    predictionData,
    isDraft: data.status === PREDICTION_STATUSES.DRAFT,
  };
}

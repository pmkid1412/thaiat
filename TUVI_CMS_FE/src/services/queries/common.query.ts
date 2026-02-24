import { queryOptions } from "@tanstack/react-query";

import { convertToSelectOptions } from "@/lib/utils";
import {
  getAreas,
  getDomains,
  getImpactLevels,
  getLanguages,
  getPredictionStatuses,
} from "../api/common.api";

export const commonKeys = {
  all: ["common"] as const,
  getLanguages: () =>
    queryOptions({
      queryKey: [...commonKeys.all, "languages"] as const,
      queryFn: getLanguages,
      select: convertToSelectOptions,
    }),
  getAreas: (languageId?: number) =>
    queryOptions({
      queryKey: [...commonKeys.all, "areas", languageId] as const,
      queryFn: () => getAreas(languageId),
      select: convertToSelectOptions,
      enabled: Boolean(languageId),
    }),
  getDomains: (languageId?: number) =>
    queryOptions({
      queryKey: [...commonKeys.all, "domains", languageId] as const,
      queryFn: () => getDomains(languageId),
      select: convertToSelectOptions,
      enabled: Boolean(languageId),
    }),
  getImpactLevels: (languageId?: number) =>
    queryOptions({
      queryKey: [...commonKeys.all, "impact-levels", languageId] as const,
      queryFn: () => getImpactLevels(languageId),
      select: convertToSelectOptions,
      enabled: Boolean(languageId),
    }),
  getPredictionStatuses: (languageId?: number) =>
    queryOptions({
      queryKey: [...commonKeys.all, "prediction-statuses", languageId] as const,
      queryFn: () => getPredictionStatuses(languageId),
      select: convertToSelectOptions,
      enabled: Boolean(languageId),
    }),
};

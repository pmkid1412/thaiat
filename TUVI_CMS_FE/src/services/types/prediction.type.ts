// Type for API requests

import type { PredictionDataFormData } from "@/shared/schemas/prediction.schema";
import type {
  PredictionStatus,
  PredictionType,
} from "@/shared/types/prediction";

export interface CreatePredictionRequest {
  predictionDate: string; // YYYY-MM-DD
  startDate?: string;
  endDate?: string;
  domainId: number;
  impactLevelId: number;
  predictionStatusId: number;
  confidenceScore: number;
  areas: number[]; // normalized country/area IDs
  tags?: string;
  predictionData: PredictionDataFormData[];
  type: PredictionType;
  status: PredictionStatus;
  thumbnailUrl?: string;
}

export type PredictionSearchParams = {
  page?: number;
  pageSize?: number;
  type?: PredictionType;
  statusId?: number;
  search?: string;
  languageId?: number;
};

export interface PredictionItem {
  id: number;
  confidenceScore: number;
  domainName: string;
  predictionStatus: string;
  title: string;
  summary: string;
  description: string;
  evidenceCount: number;
  createdAt: string;
  areas: string[];
  status: PredictionStatus;
  type: PredictionType;
  thumbnailUrl?: string;
}

export interface PredictionListResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: PredictionItem[];
}

// Detailed view types based on API response shape
export interface LocalizedNameItem {
  id: number;
  name: string;
  languageId: number;
  languageName: string;
}

export interface PredictionDataDetailsItem {
  id: number;
  title: string;
  description: string;
  summary: string;
  languageId: number;
  languageName: string;
}

export interface AreaLocalizedItem {
  id: number;
  areaId: number;
  name: string;
  languageId: number;
  languageName: string;
}

export interface PredictionDetails {
  id: number;
  predictionDate: string;
  startDate?: string | null;
  endDate?: string | null;
  confidenceScore: number;
  tags: string[];
  predictionData: PredictionDataDetailsItem[];
  domainData: LocalizedNameItem[];
  impactLevelData: LocalizedNameItem[];
  predictionStatusData: LocalizedNameItem[];
  areas: AreaLocalizedItem[][]; // grouped by language or other grouping
  domainId: number;
  impactLevelId: number;
  predictionStatusId: number;
  type: PredictionType;
  status: PredictionStatus;
  thumbnailUrl?: string;
}

export type PredictionOverviewResponse = {
  total: number;
  active: number;
  occurred: number;
  accuracy: number;
  averageConfidence: number;
};

export type PredictionStatsDomainItem = {
  domainName: string;
  predictionCount: number;
};

export type PredictionStatsStatusItem = {
  statusName: string;
  predictionCount: number;
};

export type PredictionStatsConfidenceItem = {
  confidenceRange: string;
  predictionCount: number;
};

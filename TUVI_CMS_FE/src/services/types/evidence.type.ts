export type CreateEvidenceRequest = {
  title: string;
  source?: string;
  link: string;
  publishedDate?: string;
  confidenceScore: number;
  quote?: string;
  predictionId: number;
};

export type EvidenceItem = {
  id: number;
  title: string;
  source: string;
  link: string;
  publishedDate: string;
  confidenceScore: number;
  quote: string;
};

export type EvidenceListResponse = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: EvidenceItem[];
}

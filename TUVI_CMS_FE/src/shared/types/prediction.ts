import { PREDICTION_STATUSES, PREDICTION_TYPES } from "../constants";

export type PredictionType =
  (typeof PREDICTION_TYPES)[keyof typeof PREDICTION_TYPES];
export type PredictionStatus =
  (typeof PREDICTION_STATUSES)[keyof typeof PREDICTION_STATUSES];

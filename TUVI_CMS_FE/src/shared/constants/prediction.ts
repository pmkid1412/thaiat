// export const PREDICTION_TYPES = [
//   { label: "Tổng quan theo tháng", value: "0" },
//   { label: "Dự đoán hàng ngày", value: "1" },
// ];

export const PREDICTION_TYPES = {
  FREE: "Free",
  PRO: "Pro",
} as const;

export const PREDICTION_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export const PREDICTION_STATUSES_OPTIONS = [
  {
    label: "Nháp",
    value: PREDICTION_STATUSES.DRAFT,
    className: "border-gray-300 bg-gray-50 text-gray-800",
  },
  {
    label: "Chính thức",
    value: PREDICTION_STATUSES.PUBLISHED,
    className: "border-green-600 text-green-800 bg-green-50",
  },
];

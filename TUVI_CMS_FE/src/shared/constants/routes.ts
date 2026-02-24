export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
  },
  HOME: "/",
  USERS: "/users",

  PREDICTIONS: "/predictions",
  PREDICTIONS_NEW: "/predictions/new",
  PREDICTIONS_DETAIL: (id: string) => `/predictions/${id}`,
  PREDICTIONS_EDIT: "/predictions/$id/edit",
  STATISTICS: "/statistics",
  CONFIGS: "/configs",
};

export type SuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type ItemType<T = number> = {
  id: T;
  name: string;
};

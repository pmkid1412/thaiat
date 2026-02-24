export type UpgradeHistory = {
  id: number;
  upgradeType: string;
  startDate: string;
  endDate: string;
  upgradeReason: string;
  createdAt: string;
};

export type UserDetails = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  dateOfBirth: string | null;
  timeOfBirth: string | null;
  placeOfBirth: string | null;
  userType: number;
  timezone: string;
  upgradeHistories?: UpgradeHistory[];
};

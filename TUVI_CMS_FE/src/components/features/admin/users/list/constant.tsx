import { Crown } from "lucide-react";
import type { ReactNode } from "react";

export const USER_TYPE_TAGS: {
  value: number;
  label: string;
  icon?: ReactNode;
}[] = [
  { label: "Free", value: 0 },
  { label: "Pro", value: 1, icon: <Crown className="text-purple-600" /> },
];

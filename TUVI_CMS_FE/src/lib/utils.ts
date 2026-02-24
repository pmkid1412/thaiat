import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToSelectOptions<T extends { id: number; name: string }>(
  items: T[]
): { label: string; value: number }[] {
  return items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
}

import { items } from "@/components/layout/admin/constants";
import { ROUTES } from "../constants";

export const getPageInfo = (url: string) => {
  const currentItem = items.find((item) => {
    if (item.url === ROUTES.HOME) {
      return url === item.url;
    } else {
      return url.startsWith(item.url);
    }
  });
  return currentItem;
};

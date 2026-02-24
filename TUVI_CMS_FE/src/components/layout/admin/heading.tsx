import { useLocation } from "@tanstack/react-router";
import type { DetailedHTMLProps, FC } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { getPageInfo } from "@/shared/utils/common";
import { cn } from "@/lib/utils";

type AdminHeadingProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const AdminHeading: FC<AdminHeadingProps> = ({ className }) => {
  const location = useLocation();

  const selectedItem = getPageInfo(location.pathname);

  return (
    <div className={cn("flex gap-1 bg-white w-full py-4 shadow-sm", className)}>
      <SidebarTrigger className="my-0.5 mx-2" />

      <div>
        <h1 className="text-2xl font-medium">{selectedItem?.heading}</h1>
        <p className="text-muted-foreground mt-1">
          {selectedItem?.description}
        </p>
      </div>
    </div>
  );
};

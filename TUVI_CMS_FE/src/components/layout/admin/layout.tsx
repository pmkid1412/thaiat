import type { FC } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeading } from "./heading";
import { AdminSidebar } from "./sidebar";

export const AdminLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className="w-full bg-gray-50 relative pt-[92px]">
        <AdminHeading className="absolute left-0 right-0 top-0" />
        <section className="min-h-[calc(100%-92px)] py-8 px-6 max-w-8xl mx-auto">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
};

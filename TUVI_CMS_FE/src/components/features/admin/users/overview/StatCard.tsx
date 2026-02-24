import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  color?: string;
}

export function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <Card className="p-6 bg-card shadow-sm">
      <CardContent className="px-0">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm">{label}</p>
            <div className="text-2xl font-semibold text-foreground">{value}</div>
          </div>
          <div className={cn("p-2.5 rounded-lg", color)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

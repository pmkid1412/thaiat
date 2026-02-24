import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { ROUTES } from "@/shared/constants";

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    isCurrent?: boolean;
  }>;
  containDefaultItem?: boolean;
}

export function Breadcrumb({
  items,
  containDefaultItem = true,
}: BreadcrumbProps) {
  return (
    <BaseBreadcrumb>
      <BreadcrumbList>
        {containDefaultItem && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={ROUTES.HOME}>
                <Home size={16} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {items.map((item, idx) => (
          <>
            {(idx > 0 || containDefaultItem) && (
              <BreadcrumbSeparator key={`sep-${idx}`} />
            )}
            <BreadcrumbItem key={item.label}>
              {item.isCurrent ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <span>{item.label}</span>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
}

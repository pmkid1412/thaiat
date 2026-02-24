"use client";

import {
  Pagination as BasePagination,
  PaginationItem,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationContent,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  // Optional total number of items and page size so we can show ranges (e.g. "Showing 1–50 of 130")
  totalItems?: number;
  pageSize?: number;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  totalItems = 0,
  pageSize = 50,
}) => {
  // Don't render pagination if there's only one page or no pages
  if (totalPages < 1) return null;

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if total is small (≤7 pages)
      // Example: [1] [2] [3] [4] [5] [6] [7]
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show ellipsis for large page counts (>7 pages)
      // Example: [1] [...] [8] [9] [10] [...] [50]

      // Always show page 1
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis1" />);
      }

      // Show current page and surrounding pages (±1)
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        // Skip page 1 and last page (they're handled separately)
        if (i !== 1 && i !== totalPages) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis2" />);
      }

      // Always show last page (if there's more than one page)
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              isActive={currentPage === totalPages}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const start = Math.max(1, (currentPage - 1) * pageSize + 1);
  const end = Math.min(totalItems, currentPage * pageSize);

  return (
    <div className="flex items-center">
      {typeof totalItems === "number" && totalItems > 0 && (
        <div className="ml-3 hidden md:block text-sm text-muted-foreground shrink-0">
          Hiển thị <span className="font-semibold text-black">{start}</span> đến{" "}
          <span className="font-semibold text-black">{end}</span> /{" "}
          <span className="font-semibold text-black">{totalItems}</span>
        </div>
      )}
      <BasePagination className={className}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn({
                "pointer-events-none opacity-50": currentPage <= 1,
              })}
              aria-disabled={currentPage <= 1}
              href="#"
              onClick={handlePrevious}
            />
          </PaginationItem>

          <div className="flex items-center gap-1 md:gap-2">
            {generatePaginationItems()}
          </div>
          <PaginationItem>
            <PaginationNext
              className={cn({
                "pointer-events-none opacity-50": currentPage >= totalPages,
              })}
              aria-disabled={currentPage >= totalPages}
              href="#"
              onClick={handleNext}
            />
          </PaginationItem>
        </PaginationContent>
      </BasePagination>

      {/* Trang 1 trên 1 */}
      {totalPages > 0 && (
        <div className="mr-3 hidden md:block text-sm text-muted-foreground shrink-0">
          Trang <span className="font-semibold text-black">{currentPage}</span>{" "}
          / <span className="font-semibold text-black">{totalPages}</span>
        </div>
      )}
    </div>
  );
};

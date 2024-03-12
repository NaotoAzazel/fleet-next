"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type PaginationProps = {
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
  totalRecords: number;
};

export default function DashboardPagination(props: PaginationProps) {
  const { page: currentPage = 1, totalRecords, totalPages } = props;
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalRecords / 8); i++) {
    pages.push(i);
  }

  const router = useRouter();
  const pathname = usePathname();

  const setCurrentPage = useCallback((newPage: string) => {
    let params = new URLSearchParams(window.location.search);
    if(newPage.length) params.set("page", newPage);
    else params.delete("page");

    router.replace(`${pathname}?${params}`);
  }, [router, pathname]);

  const handlePrevPage = () => {
    if(currentPage > 1) {
      setCurrentPage((currentPage - 1).toString());
    }
  }

  const handleNextPage = () => {
    if(currentPage < pages.length) {
      setCurrentPage((currentPage + 1).toString());
    }
  }

  return (
    <Pagination className="justify-between items-center">
      <p className="text-muted-foreground text-sm">
        Страница {currentPage} из {totalPages}
      </p>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            className="cursor-pointer" 
            onClick={() => handlePrevPage()}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext 
            className="cursor-pointer" 
            onClick={() => handleNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
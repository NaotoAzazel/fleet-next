"use client"

import {
  Pagination as Pagi,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

type PaginationProps = {
  page?: number;
  totalPages: number;
  totalRecords: number;
};

export function Pagination(props: PaginationProps) {
  const { page: currentPage = 1, totalRecords, totalPages } = props;

  const RECORDS_PER_PAGE = 8;

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalRecords / RECORDS_PER_PAGE); i++) {
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
    <Pagi className="justify-between items-center">
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
    </Pagi>
  )
}
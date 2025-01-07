import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface IPagination {
  currentPage: number;
  totalPage: number;
}

const Paginations: React.FC<IPagination> = ({ currentPage, totalPage }) => {
  const route = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get search parameters (query params)

  const [page, setPage] = useState(currentPage); // Use local state to manage currentPage

  // Update currentPage whenever the searchParams (URL query) changes
  useEffect(() => {
    const pageFromQuery = parseInt(searchParams.get("page") || "1", 10);
    setPage(pageFromQuery); // Update the local state based on URL query
  }, [searchParams]); // Depend on searchParams to re-trigger on query change

  const pageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString()); // Update the page query parameter
    route.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              console.log("Current page is: ", page);
              console.log("Navigate to: ", page - 1);
              if (currentPage > 1) pageChange(page - 1);
            }}
            className="cursor-pointer"
          />
        </PaginationItem>

        {/* Page numbers */}
        {Array.from({ length: totalPage }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={(e) => {
                pageChange(index + 1); // Use onClick to trigger page change
              }}
              isActive={page === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis for skipped pages */}
        {totalPage > 5 && page < totalPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              console.log("Current page is: ", page);
              console.log("Navigate to: ", page + 1);
              if (page >= 1) pageChange(page + 1);
            }}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;

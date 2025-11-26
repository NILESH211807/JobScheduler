import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationTool({ page, totalPages, setPage, handlePagination }) {
    return (
        <div className="w-full flex justify-center pb-10">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) {
                                    const newPage = page - 1;
                                    setPage(newPage);
                                    handlePagination(newPage);
                                }
                            }}
                        />
                    </PaginationItem>

                    {/* Show first page if current page is far from start */}
                    {page > 2 && (
                        <>
                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(1);
                                        handlePagination(1);
                                    }}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            {page > 3 && <PaginationEllipsis />}
                        </>
                    )}

                    {/* Previous page */}
                    {page > 1 && (
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const newPage = page - 1;
                                    setPage(newPage);
                                    handlePagination(newPage);
                                }}
                            >
                                {page - 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Current page */}
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            isActive={true}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>

                    {/* Next page */}
                    {page < totalPages && (
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const newPage = page + 1;
                                    setPage(newPage);
                                    handlePagination(newPage);
                                }}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Show last page if current page is far from end */}
                    {page < totalPages - 1 && (
                        <>
                            {page < totalPages - 2 && <PaginationEllipsis />}
                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(totalPages);
                                        handlePagination(totalPages);
                                    }}
                                >
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            onClick={(e) => {
                                e.preventDefault();
                                if (page < totalPages) {
                                    const newPage = page + 1;
                                    setPage(newPage);
                                    handlePagination(newPage);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
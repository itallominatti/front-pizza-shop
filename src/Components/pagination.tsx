

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "./button"

export interface PaginationProps {
    pageIndex: number
    totalCount: number
    perPage: number
    onPageChange: (pageindex: number) => Promise<void> | void
}


export function Pagination({ pageIndex, perPage, totalCount, onPageChange }: PaginationProps) {
    const pages = Math.ceil(totalCount / perPage) || 1

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
                total de {totalCount} items(s)
            </span>

            <div className="flex items-center gap-6 lg:gap-8">
                <div className="text-sm font-medium">Página {pageIndex + 1} de {pages}</div>
                <div className="flex items-center gap-2">

                    <Button disabled={pageIndex === 0} onClick={() => onPageChange(0)} variant="outline">
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="sr-only">Primeira Página</span>
                    </Button>

                    <Button disabled={pages <= pageIndex + 1} onClick={() => onPageChange(pageIndex + 1)} variant="outline">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Próxima página</span>
                    </Button>

                    <Button disabled={pageIndex === 0} onClick={() => onPageChange(pageIndex - 1)} variant="outline">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Página anterior</span>
                    </Button>

                    <Button disabled={pages <= pageIndex + 1} onClick={() => onPageChange(pages - 1)} variant="outline">
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only">última Página</span>
                    </Button>
                </div>
            </div >
        </div >
    )
}
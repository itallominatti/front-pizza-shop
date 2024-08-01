import { Table, TableHead, TableHeader, TableRow, TableBody } from "@/Components/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/Components/pagination";
import { getOrders } from "@/api/get-orders";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";




export function Orders() {

    const [searchParams, setSearchParams] = useSearchParams()


    const pageIndex = z.coerce.number()
        .transform(page => page - 1)
        .parse(searchParams.get('pageIndex') ?? '0')

    const { data: result } = useQuery({
        queryKey: ['orders', pageIndex],
        queryFn: () => getOrders({ pageIndex })
    })

    function handlePaginate(pageIndex: number) {
        setSearchParams(prev => {
            prev.set('page', (pageIndex + 1).toString())

            return prev
        })
    }

    return <>
        <Helmet title="Pedidos" />
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

            <div className="space-y-2.5">
                <OrderTableFilters />

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead className="w-[148px]">Identificador</TableHead>
                                <TableHead className="w-[180px]">Realizado Há</TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="w-[140px]">Total do pedido</TableHead>
                                <TableHead className="w-[164px]"></TableHead>
                                <TableHead className="w-[132px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result && result.orders.map((order) => {
                                return <OrderTableRow key={order.orderId} order={order} />
                            })}
                        </TableBody>
                    </Table>
                </div>
                {
                    result && (
                        <Pagination
                            pageIndex={result.meta.pageIndex}
                            totalCount={result.meta.totalCount}
                            perPage={result.meta.perPage}
                            onPageChange={handlePaginate}
                        />
                    )
                }
            </div>
        </div>
    </>
}
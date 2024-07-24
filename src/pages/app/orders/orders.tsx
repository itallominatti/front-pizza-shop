import { Table, TableHead, TableHeader, TableRow, TableBody } from "@/Components/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/Components/pagination";



export function Orders() {
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
                            <OrderTableRow />
                        </TableBody>
                    </Table>
                </div>
                <Pagination pageIndex={0} perPage={10} totalCount={105} />
            </div>
        </div>
    </>
}
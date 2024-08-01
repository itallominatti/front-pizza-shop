
import { TableRow, TableCell } from "@/Components/table"
import { Button } from "@/Components/button"
import { ArrowRight, Search, X } from "lucide-react"
import { Dialog, DialogTrigger } from "@/Components/dialog"
import { OrderDetails } from "./order-details"
import { statusType } from "@/api/get-orders"
import { OrderStatus } from "@/Components/order-status"
import { ptBR } from 'date-fns/locale'

import { formatDistanceToNow } from 'date-fns'


export interface OrderTableRowProps {
    order: {
        orderId: string
        createdAt: string
        status: statusType
        customerName: string
        total: number
    }
}

export function OrderTableRow({ order }: OrderTableRowProps) {

    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'outline'} size='xs'>
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>

                    <OrderDetails />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
            <TableCell className="text-muted-foreground">{formatDistanceToNow(order.createdAt, {
                locale: ptBR,
                addSuffix: true
            })}</TableCell>
            <TableCell className="">
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="font-medium">{order.total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })}</TableCell>
            <TableCell>
                <Button variant={'outline'} size={'xs'}>
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant={'ghost'} size={'xs'}>
                    <X className="h-3 w-3 mr-2" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )




}
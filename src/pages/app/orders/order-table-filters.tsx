
import { Button } from "@/Components/button"
import { Input } from "@/Components/input"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/Components/select"
import { Search, X } from "lucide-react"


export function OrderTableFilters() {
    return (
        <form className="flex items-center gap-2" action="">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input placeholder="ID do pedido" className="h-8 w-auto" />
            <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
            <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos status</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                    <SelectItem value="processing">Em preparo</SelectItem>
                    <SelectItem value="delivering">Em entrega</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
            </Select>

            <Button type="submit" variant="secondary" size={'xs'}>
                <Search className="h-4 w-4 mr-2" />
                Filtrar resultados
            </Button>

            <Button type="button" variant="outline" size={'xs'}>
                <X className="h-4 w-4 mr-2" />
                Remover filtros
            </Button>
        </form>
    )
}
import { api } from "@/lib/axios";

export type statusType = 'pending' | 'canceled' | 'processing' | 'delivered' | 'delivering'

export interface getOrdersQuery {
    pageIndex?: number | null
}

export interface GetOrdersResponse {

    orders: {
        orderId: string
        createdAt: string
        status: statusType
        customerName: string
        total: number
    }[]
    meta: {
        pageIndex: number
        perPage: number
        totalCount: number
    }

}

export async function getOrders({ pageIndex }: getOrdersQuery) {
    const response = await api.get<GetOrdersResponse>('/orders', {
        params: {
            pageIndex,

        }
    })

    return response.data
}
import { api } from "@/lib/axios";

export interface registerRestaurantBody {
    restaurantName: string
    managerName: string
    email: string
    phone: string
}

export async function RegisterRestaurant({
    restaurantName,
    email,
    phone,
    managerName
}: registerRestaurantBody) {

    await api.post('/restaurants', {
        restaurantName,
        email,
        phone,
        managerName
    })
}
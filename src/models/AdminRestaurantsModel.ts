export interface AdminRestaurantsModel {
    restaurants: AdminRestaurant[]
}
export type AdminRestaurant = {
    name: string,
    image: string,
    id: number
    restVisible: number;
}
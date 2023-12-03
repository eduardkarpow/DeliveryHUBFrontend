export interface AdminFoodModel{
    foods: AdminFood[]
}
export type AdminFood = {
    name: string,
    image: number,
    isVisible: number,
    id: number,
}
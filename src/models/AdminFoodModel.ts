export interface AdminFoodModel{
    foods: AdminFood[];
    specs: string[];
}
export type AdminFood = {
    name: string,
    image: number,
    isVisible: number,
    id: number,
}
export interface AdminIngredientsModel{
    ingredients: AdminIngredient[]
}
export type AdminIngredient = {
    id: number;
    name: string;
    image: string;
}
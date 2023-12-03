export interface AdminIngredientsModel{
    ingredients: AdminIngredient[],
    foodIngredients: AdminIngredient[],
}
export type AdminIngredient = {
    id: number;
    name: string;
    image: string;
}
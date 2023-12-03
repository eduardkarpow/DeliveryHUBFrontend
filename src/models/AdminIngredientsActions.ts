import {AdminIngredient} from "./AdminIngredientsModel";

export type AdminIngredientsActions = GET_INGREDIENTS | DELETE_INGREDIENT;

export type GET_INGREDIENTS = {
    type: "GET_INGREDIENTS";
    ingredients: AdminIngredient[]
    foodIngredients: AdminIngredient[]
}
export type DELETE_INGREDIENT = {
    type: "DELETE_INGREDIENT";
    foodIngredients: AdminIngredient[];
}
import {AdminIngredient} from "./AdminIngredientsModel";

export type AdminIngredientsActions = GET_INGREDIENTS;

export type GET_INGREDIENTS = {
    type: "GET_INGREDIENTS";
    ingredients: AdminIngredient[]
}
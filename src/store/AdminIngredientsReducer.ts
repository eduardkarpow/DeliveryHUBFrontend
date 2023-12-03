import {AdminIngredient, AdminIngredientsModel} from "../models/AdminIngredientsModel";
import {AdminIngredientsActions, DELETE_INGREDIENT, GET_INGREDIENTS} from "../models/AdminIngredientsActions";

const initialState:AdminIngredientsModel = {
    ingredients: [],
    foodIngredients: []
}

export const AdminIngredientsReducer = (state:AdminIngredientsModel=initialState, action:AdminIngredientsActions) => {
    switch (action.type){
        case "GET_INGREDIENTS":
            return {...state, ingredients: [...action.ingredients], foodIngredients: [...action.foodIngredients]};
        case "DELETE_INGREDIENT":
            return {...state, foodIngredients: [...action.foodIngredients]};
        default:
            return state;
    }
}

export const getIngredientsActionCreator = (ingredients:AdminIngredient[], foodIngredients:AdminIngredient[]):GET_INGREDIENTS => {
    return {type: "GET_INGREDIENTS", ingredients: ingredients, foodIngredients: foodIngredients};
}
export const deleteIngredientActionCreator = (foodIngredients:AdminIngredient[]):DELETE_INGREDIENT => {
    return {type: "DELETE_INGREDIENT", foodIngredients: foodIngredients};
}
import {AdminRestaurant, AdminRestaurantsModel} from "../models/AdminRestaurantsModel";
import {AdminRestaurantsActions, GET_RESTS} from "../models/AdminRestaurantsActions";
import {AdminIngredient, AdminIngredientsModel} from "../models/AdminIngredientsModel";
import {AdminIngredientsActions, GET_INGREDIENTS} from "../models/AdminIngredientsActions";

const initialState:AdminIngredientsModel = {
    ingredients: []
}

export const AdminIngredientsReducer = (state:AdminIngredientsModel=initialState, action:AdminIngredientsActions) => {
    switch (action.type){
        case "GET_INGREDIENTS":
            return {...state, ingredients: [...action.ingredients]};
        default:
            return state;
    }
}

export const getIngredientsActionCreator = (ingredients:AdminIngredient[]):GET_INGREDIENTS => {
    return {type: "GET_INGREDIENTS", ingredients: ingredients}
}
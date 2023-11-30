import {IngredientsStateModel} from "../models/IngredientsModel";
import {OrderInfoModel} from "../models/OrderInfoModel";
import {OrderInfoAction} from "../models/OrderInfoActions";
import {GET_INFO, IngredientsActions} from "../models/IngredientsActions";

const initialState:IngredientsStateModel = {
    weight: 0,
    calories: 0,
    name: "",
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    id: 0,
    image: "",
    ingredients: []
}
export const IngredientsReducer = (state:IngredientsStateModel=initialState, action:IngredientsActions) => {
    switch (action.type){
        case "GET_INFO":
            return {...state, ...action.ingredientsInfo};
        default:
            return state;
    }
}

export const getInfoActionCreator = (ingredientsInfo:IngredientsStateModel):GET_INFO => {return {type: "GET_INFO", ingredientsInfo: ingredientsInfo}};
import {AdminFood, AdminFoodModel} from "../models/AdminFoodModel";
import {AdminFoodActions, DELETE_FOOD, GET_FOODS} from "../models/AdminFoodActions";

const initialState:AdminFoodModel = {
    foods: []
}

export const AdminFoodReducer = (state:AdminFoodModel=initialState, action:AdminFoodActions) => {
    switch (action.type){
        case "GET_FOODS":
            return {...state, foods: [...action.foods]};
        case "DELETE_FOOD":
            return {...state, foods: action.foods}
        default:
            return state;
    }
}

export const getFoodsActionCreator = (foods:AdminFood[]):GET_FOODS => {
    return {type: "GET_FOODS", foods: foods}
}
export const deleteFoodActionCreator = (foods:AdminFood[]):DELETE_FOOD => {
    return {type: "DELETE_FOOD", foods: foods}
}
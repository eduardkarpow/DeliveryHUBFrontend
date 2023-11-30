import {AdminFood, AdminFoodModel} from "../models/AdminFoodModel";
import {AdminFoodActions, GET_FOODS} from "../models/AdminFoodActions";

const initialState:AdminFoodModel = {
    foods: []
}

export const AdminFoodReducer = (state:AdminFoodModel=initialState, action:AdminFoodActions) => {
    switch (action.type){
        case "GET_FOODS":
            return {...state, foods: [...action.foods]};
        default:
            return state;
    }
}

export const getFoodsActionCreator = (foods:AdminFood[]):GET_FOODS => {
    return {type: "GET_FOODS", foods: foods}
}
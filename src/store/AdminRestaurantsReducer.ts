
import {AdminRestaurant, AdminRestaurantsModel} from "../models/AdminRestaurantsModel";
import {AdminRestaurantsActions, GET_RESTS} from "../models/AdminRestaurantsActions";

const initialState:AdminRestaurantsModel = {
    restaurants: []
}

export const AdminRestaurantsReducer = (state:AdminRestaurantsModel=initialState, action:AdminRestaurantsActions) => {
    switch (action.type){
        case "GET_RESTS":
            return {...state, restaurants: [...action.restaurants]};
        default:
            return state;
    }
}

export const getRestsActionCreator = (restaurants:AdminRestaurant[]):GET_RESTS => {
    return {type: "GET_RESTS", restaurants: restaurants}
}
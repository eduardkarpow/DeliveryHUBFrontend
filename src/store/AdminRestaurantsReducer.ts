
import {AdminRestaurant, AdminRestaurantsModel} from "../models/AdminRestaurantsModel";
import {AdminRestaurantsActions, GET_RESTS, UPDATE_REST} from "../models/AdminRestaurantsActions";

const initialState:AdminRestaurantsModel = {
    restaurants: []
}

export const AdminRestaurantsReducer = (state:AdminRestaurantsModel=initialState, action:AdminRestaurantsActions) => {
    switch (action.type){
        case "GET_RESTS":
            return {...state, restaurants: [...action.restaurants]};
        case "UPDATE_REST":
            return {...state, restaurants: [...action.restaurants]}
        default:
            return state;
    }
}

export const getRestsActionCreator = (restaurants:AdminRestaurant[]):GET_RESTS => {
    return {type: "GET_RESTS", restaurants: restaurants}
}
export const updateRestsActionCreator = (restaurants:AdminRestaurant[]):UPDATE_REST => {
    return {type: "UPDATE_REST", restaurants: restaurants}
}
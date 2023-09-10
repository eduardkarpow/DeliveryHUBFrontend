import {RestaurantModel, RestaurantsStateModel, SpecializationModel} from "../models/RestaurantsModel";
import {GET_REST, GET_SPECS, RestaurantsActions} from "../models/RestaurantsActions";


const initialState:RestaurantsStateModel = {
    restaurants: [],
    specializations: []
}

export const RestaurantsReducer = (state:RestaurantsStateModel=initialState, action:RestaurantsActions) => {
    switch (action.type){
        case "GET_REST":

            return {...state, restaurants: [...action.restaurants]};
        case "GET_SPECS":

            return {...state, specializations: [...action.specializations]};
        default:
            return state;
    }
}

export const getRestActionCreator = (restaurants:RestaurantModel[]):GET_REST => {return {type: "GET_REST", restaurants:restaurants}};
export const getSpecActionCreator = (specializations:SpecializationModel[]):GET_SPECS => {return {type: "GET_SPECS", specializations: specializations}};
import {AccountStateModel, LocationModel} from "../models/AccountModel";
import {AccountActions, ADD_LOCATION, GET_LOCATIONS} from "../models/AccountActions";

const initialState:AccountStateModel = {
    locations: []
}

export const AccountReducer = (state:AccountStateModel=initialState, action:AccountActions) => {
    switch (action.type){
        case "GET_LOCATIONS":
            return {...state, locations: [...action.locations]};
        case "ADD_LOCATION":
            return {...state, locations: [...state.locations, action.location]};
        default:
            return state;
    }
}

export const getLocationsActionCreator = (locations:LocationModel[]):GET_LOCATIONS => {
    return {type: "GET_LOCATIONS", locations: locations}
}
export const addLocationActionCreator = (location:LocationModel):ADD_LOCATION => {
    return {type: "ADD_LOCATION", location: location}
}
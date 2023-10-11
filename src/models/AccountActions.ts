import {LocationModel} from "./AccountModel";

export type AccountActions = GET_LOCATIONS | ADD_LOCATION;

export type GET_LOCATIONS = {
    type: "GET_LOCATIONS",
    locations: LocationModel[]
}
export type ADD_LOCATION = {
    type: "ADD_LOCATION",
    location: LocationModel
}
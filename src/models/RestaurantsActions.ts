import {RestaurantModel, SpecializationModel} from "./RestaurantsModel";

export type RestaurantsActions = GET_REST | GET_SPECS;

export type GET_REST = {
    type: "GET_REST";
    restaurants: RestaurantModel[];
}
export type GET_SPECS = {
    type: "GET_SPECS";
    specializations: SpecializationModel[];
}
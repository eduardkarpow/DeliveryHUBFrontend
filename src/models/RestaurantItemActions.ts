import {RestaurantModel} from "./RestaurantsModel";

export type RestaurantItemActions = GET_RESTAURANT;

export type GET_RESTAURANT = {
    type: "GET_RESTAURANT",
    restaurant: RestaurantModel
}
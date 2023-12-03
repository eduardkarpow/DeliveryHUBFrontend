import {AdminRestaurant} from "./AdminRestaurantsModel";

export type AdminRestaurantsActions = GET_RESTS | UPDATE_REST;

export type GET_RESTS = {
    type: "GET_RESTS",
    restaurants: AdminRestaurant[]
}
export type UPDATE_REST = {
    type: "UPDATE_REST",
    restaurants: AdminRestaurant[]
}
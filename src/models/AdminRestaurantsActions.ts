import {AdminRestaurant} from "./AdminRestaurantsModel";

export type AdminRestaurantsActions = GET_RESTS ;

export type GET_RESTS = {
    type: "GET_RESTS",
    restaurants: AdminRestaurant[]
}
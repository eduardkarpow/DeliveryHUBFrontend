import {RestaurantModel} from "./RestaurantsModel";
import {MenuItemModel} from "./RestaurantItemModel";

export type RestaurantItemActions = GET_RESTAURANT | GET_MENU | CLEAR_MENU;

export type GET_RESTAURANT = {
    type: "GET_RESTAURANT",
    restaurant: RestaurantModel
}
export type GET_MENU = {
    type: "GET_MENU",
    menu: MenuItemModel[]
}
export type CLEAR_MENU = {
    type: "CLEAR_MENU"
}
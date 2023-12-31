import {MenuItemModel, RestaurantItemModel} from "../models/RestaurantItemModel";
import {CLEAR_MENU, GET_MENU, GET_RESTAURANT, RestaurantItemActions} from "../models/RestaurantItemActions";
import {RestaurantModel} from "../models/RestaurantsModel";

const initialState:RestaurantItemModel = {
    restaurant: {
        id_restaurants: 0,
        location: "",
        rating: 0,
        price_rating: 0,
        name: "",
        restaurant_image_href: "",
        specs: [],
        restVisible: 1
    },
    menu: []
}

export const RestaurantItemReducer = (state:RestaurantItemModel=initialState, action:RestaurantItemActions) => {
    switch (action.type){
        case "GET_RESTAURANT":
            return {...state, restaurant: action.restaurant};
        case "GET_MENU":
            return {...state, menu: action.menu};
        case "CLEAR_MENU":
            return {...state, menu: []};
        default:
            return state;
    }
}

export const getRestaurantActionCreator = (restaurant:RestaurantModel):GET_RESTAURANT => {return {type: "GET_RESTAURANT", restaurant: restaurant}};
export const getMenuActionCreator = (menu:MenuItemModel[]):GET_MENU => {return {type:"GET_MENU", menu: menu}};
export const clearMenuActionCreator = ():CLEAR_MENU => {return {type:"CLEAR_MENU"}}
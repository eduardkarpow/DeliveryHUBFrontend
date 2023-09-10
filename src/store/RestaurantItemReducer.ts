import {RestaurantItemModel} from "../models/RestaurantItemModel";
import {GET_RESTAURANT, RestaurantItemActions} from "../models/RestaurantItemActions";
import {RestaurantModel} from "../models/RestaurantsModel";

const initialState:RestaurantItemModel = {
    restaurant: {
        id_restaurants: 0,
        location: "",
        rating: 0,
        price_rating: 0,
        name: "",
        restaurant_image_href: "",
        specs: []
    },
}

export const RestaurantItemReducer = (state:RestaurantItemModel=initialState, action:RestaurantItemActions) => {
    switch (action.type){
        case "GET_RESTAURANT":
            return {...state, restaurant: action.restaurant};
        default:
            return state;
    }
}

export const getRestaurantActionCreator = (restaurant:RestaurantModel):GET_RESTAURANT => {return {type: "GET_RESTAURANT", restaurant: restaurant}};

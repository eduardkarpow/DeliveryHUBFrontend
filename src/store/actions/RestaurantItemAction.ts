import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {getRestaurantActionCreator} from "../RestaurantItemReducer";

export const getRestaurant = (id:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const restaurant = await fetch("/getSpecialRests", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({id_restaurants: id})
        }).then(res => res.json());
        dispatch(getRestaurantActionCreator(restaurant[0]));
    }
}
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {getRestActionCreator, getSpecActionCreator} from "../RestaurantsReducer";


export const getAllRestaurants = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const restaurants = await fetch("/getRestaurants", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        dispatch(getRestActionCreator(restaurants));
    }
}
export const getSpecialRestaurants = (special: {}):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const restaurants = await fetch("/getSpecialRests", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(special)
        }).then(res => res.json());
        dispatch(getRestActionCreator(restaurants));
    }
}
export const getAllSpecializations = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const specs = await fetch("/getSpecializations", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        dispatch(getSpecActionCreator(specs));
    }
}
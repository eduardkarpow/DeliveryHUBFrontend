import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {getRestActionCreator, getSpecActionCreator} from "../RestaurantsReducer";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";


export const getAllRestaurants = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const restaurants = await fetch("/getRestaurants", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            dispatch(getRestActionCreator(restaurants));
        } catch(e:any){
            ErrorHandlerHook(e);
        }

    }
}
export const getSpecialRestaurants = (special: {}):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const restaurants = await fetch("/getSpecialRests", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(special)
            }).then(res => res.json());
            dispatch(getRestActionCreator(restaurants));
        } catch(e:any){
            ErrorHandlerHook(e);
        }

    }
}
export const getAllSpecializations = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const specs = await fetch("/getSpecializations", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            dispatch(getSpecActionCreator(specs));
        } catch (e:any) {
            ErrorHandlerHook(e);
        }
    }
}
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {getMenuActionCreator, getRestaurantActionCreator} from "../RestaurantItemReducer";
import {MenuItemModel} from "../../models/RestaurantItemModel";
import {setPrice} from "./OrdersAction";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";

export const getRestaurant = (id:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const restaurant = await fetch("/getSpecialRests", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({id_restaurants: id})
            }).then(res => res.json());
            dispatch(getRestaurantActionCreator(restaurant[0]));
        } catch (e:any){
            ErrorHandlerHook(e);
        }

    }
}
export const getMenu = (id:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{

            const menu = await fetch(`/getMenu/?id=${id}`, {
                method: "GET"
            }).then(res => res.json());
            for(let i = 0; i < menu.length; i++){
                menu[i].amount = 0;
            }
            dispatch(getMenuActionCreator(menu));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const increment = (index:number, menu:MenuItemModel[]):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            menu[index].amount += 1;
            dispatch(getMenuActionCreator(menu));
            dispatch(setPrice(menu));
        } catch (e:any) {
            ErrorHandlerHook(e);
        }

    }
}
export const decrement = (index:number, menu:MenuItemModel[]):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            menu[index].amount -= 1;
            dispatch(getMenuActionCreator(menu));
            dispatch(setPrice(menu));
        } catch (e:any) {
            ErrorHandlerHook(e);
        }

    }
}

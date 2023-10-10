import {AnyAction} from "redux";
import {RootState} from "../index";
import {ThunkAction} from "redux-thunk";
import {MenuItemModel} from "../../models/RestaurantItemModel";
import {setPriceActionCreator} from "../OrdersReducer";

export const setPrice = (menu:MenuItemModel[]):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        dispatch(setPriceActionCreator(menu.reduce((s:number,a:MenuItemModel) => s + a.price * a.amount, 0)));
    }
}
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {getInfoActionCreator} from "../IngredientsReduecer";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";

export const getIngredientsInfo = (id:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const orderInfo = await fetch("/getFoodInfo", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            }).then(res => res.json());
            dispatch(getInfoActionCreator(orderInfo));
        } catch (e: any) {
            ErrorHandlerHook(e);
        }
    }
}
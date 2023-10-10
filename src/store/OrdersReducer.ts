import {OrdersStateModel} from "../models/OrdersModel";
import {OrderAction, SET_PRICE} from "../models/OrdersActions";

const initialState: OrdersStateModel = {
    fullPrice: 0
}

export const OrdersReducer = (state:OrdersStateModel=initialState, action:OrderAction) => {
    switch (action.type){
        case "SET_PRICE":
            return {...state, fullPrice: action.fullPrice};
        default:
            return state;
    }
}

export const setPriceActionCreator = (fullPrice:number):SET_PRICE => ({type: "SET_PRICE", fullPrice});
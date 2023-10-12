import {Order, OrdersStateModel} from "../models/OrdersModel";
import {GET_ORDERS, OrderAction, SET_PRICE} from "../models/OrdersActions";

const initialState: OrdersStateModel = {
    fullPrice: 0,
    orders: []
}

export const OrdersReducer = (state:OrdersStateModel=initialState, action:OrderAction) => {
    switch (action.type){
        case "SET_PRICE":
            return {...state, fullPrice: action.fullPrice};
        case "GET_ORDERS":
            return {...state, orders: action.orders};
        default:
            return state;
    }
}

export const setPriceActionCreator = (fullPrice:number):SET_PRICE => ({type: "SET_PRICE", fullPrice});
export const getAllOrdersActionCreator = (orders:Order[]):GET_ORDERS => ({type: "GET_ORDERS", orders});
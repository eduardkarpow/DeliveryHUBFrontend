
import {AdminOrder, AdminOrdersModel} from "../models/AdminOrdersModel";
import {AdminOrdersActions, GET_ALL, UPDATE_ORDER} from "../models/AdminOrdersActions";

const initialState:AdminOrdersModel = {
    orders: [],
    statuses: []
}

export const AdminOrdersReducer = (state:AdminOrdersModel=initialState, action:AdminOrdersActions) => {
    switch (action.type){
        case "GET_ALL":
            return {...state, orders: [...action.orders], statuses: [...action.statuses]};
        case "UPDATE_ORDER":
            return {...state, orders: [...action.orders]};
        default:
            return state;
    }
}

export const getAllActionCreator = (orders:AdminOrder[], statuses:string[]):GET_ALL => {
    return {type: "GET_ALL", orders: orders, statuses: statuses}
}
export const updateOrderActionCreator = (orders:AdminOrder[]):UPDATE_ORDER => {
    return {type: "UPDATE_ORDER", orders: orders}
}
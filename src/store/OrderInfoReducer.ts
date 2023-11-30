import {OrderInfoModel} from "../models/OrderInfoModel";
import {OrderInfoAction} from "../models/OrderInfoActions";

const initialState:OrderInfoModel = {
    id: 0,
    name: "",
    restImage: "",
    fullPrice: 0,
    datetime: "",
    status: "",
    statusColor: "",
    restId: 0,
    orderElements: []
}

export const OrderInfoReducer = (state:OrderInfoModel=initialState, action:OrderInfoAction) => {
    switch (action.type){
        case "GET_INFO":
            return {...state, ...action.orderInfo};
        default:
            return state;
    }
}

export const getInfoActionCreator = (orderInfo:OrderInfoModel):OrderInfoAction => {return {type: "GET_INFO", orderInfo: orderInfo}};
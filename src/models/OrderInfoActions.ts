import {OrderInfoModel} from "./OrderInfoModel";

export type OrderInfoAction = GET_INFO;

export type GET_INFO = {
    type: "GET_INFO";
    orderInfo: OrderInfoModel;
}
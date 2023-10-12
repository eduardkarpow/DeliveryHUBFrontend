import {Order} from "./OrdersModel";

export type OrderAction = SET_PRICE | GET_ORDERS;

export type SET_PRICE = {
    type: "SET_PRICE",
    fullPrice: number
}
export type GET_ORDERS = {
    type: "GET_ORDERS",
    orders: Order[]
}
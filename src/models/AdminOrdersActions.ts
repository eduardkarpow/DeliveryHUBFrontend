import {AdminOrder} from "./AdminOrdersModel";

export type AdminOrdersActions = GET_ALL | UPDATE_ORDER;

export type GET_ALL = {
    type: "GET_ALL",
    orders: AdminOrder[],
    statuses: string[]
}
export type UPDATE_ORDER = {
    type: "UPDATE_ORDER",
    orders: AdminOrder[]
}
import {AdminFood} from "./AdminFoodModel";

export type AdminFoodActions = GET_FOODS | DELETE_FOOD | GET_SPEC;

export type GET_FOODS = {
    type: "GET_FOODS",
    foods: AdminFood[]
}
export type GET_SPEC = {
    type: "GET_SPEC",
    specs: string[]
}
export type DELETE_FOOD = {
    type: "DELETE_FOOD",
    foods: AdminFood[]
}
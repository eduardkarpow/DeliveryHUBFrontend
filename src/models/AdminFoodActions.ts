import {AdminFood} from "./AdminFoodModel";

export type AdminFoodActions = GET_FOODS | DELETE_FOOD;

export type GET_FOODS = {
    type: "GET_FOODS",
    foods: AdminFood[]
}
export type DELETE_FOOD = {
    type: "DELETE_FOOD",
    foods: AdminFood[]
}
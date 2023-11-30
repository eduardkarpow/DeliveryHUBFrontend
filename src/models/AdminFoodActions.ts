import {AdminFood} from "./AdminFoodModel";

export type AdminFoodActions = GET_FOODS;

export type GET_FOODS = {
    type: "GET_FOODS",
    foods: AdminFood[]
}
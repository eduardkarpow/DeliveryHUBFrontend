import {IngredientsStateModel} from "./IngredientsModel";

export type IngredientsActions = GET_INFO;
export type GET_INFO = {
    type: "GET_INFO",
    ingredientsInfo: IngredientsStateModel
}
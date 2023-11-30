export interface IngredientsStateModel{
    weight: number;
    calories: number;
    name: string;
    proteins: number;
    fats: number;
    carbohydrates: number;
    id: number;
    image: string;
    ingredients: ingredientsElement[];
}
export type ingredientsElement = {
    id: number;
    name: string;
    image: string;
}
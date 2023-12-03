import {RestaurantModel} from "./RestaurantsModel";

export interface RestaurantItemModel{
    restaurant: RestaurantModel;
    menu: MenuItemModel[];

}
export interface MenuItemModel{
    id: number;
    name: string;
    price: number;
    weight: number;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    image_href: string;
    isVisible: number;
    amount: number;
}
export interface MenuProps{
    restId: number;
    id: number;
    image_href: string;
    name: string;
    price: number;
    index: number;
}
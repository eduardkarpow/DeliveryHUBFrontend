import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";
import {authActionCreator, avatarActionCreator} from "../AuthReducer";
import {getRestsActionCreator} from "../AdminRestaurantsReducer";
import {getFoodsActionCreator} from "../AdminFoodReducer";
import {getIngredientsActionCreator} from "../AdminIngredientsReducer";

export const AddRestaurant = (name:string, location:string, priceRating:number, formData:FormData):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/addRestaurant", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    location,
                    priceRating
                })
            });
            setTimeout(() => {
                const href = fetch("/uploadRestaurantImage", {
                    method: "POST",
                    body: formData
                }).then(res => res.json())
            }, 500)

        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const AddFood = (name:string, price:number, weight:number, calories:number, fats:number, proteins:number, carbohydrates:number, restId:number, formData:FormData):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/addFoodInfo", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price,
                    weight,
                    calories,
                    fats,
                    proteins,
                    carbohydrates,
                    restId
                })
            });
            setTimeout(() => {
                const href = fetch("/uploadFoodImage", {
                    method: "POST",
                    body: formData
                }).then(res => res.json())
            }, 500)

        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const GetRestaurants = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/getRestaurants", {
                method: "GET",
            });
            let data = await response.json();
            data = data.map((el:any) => {
                delete el.rating;
                delete el.price_rating;
                delete el.location;
                delete el.specs;
                el.id = el.id_restaurants;
                delete el.id_restaurants;
                el.image = el.restaurant_image_href;
                delete el.restaurant_image_href;
                return el;
            })
            dispatch(getRestsActionCreator(data));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const GetFoods = (restId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/getFoods", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restId
                })
            }).then(res => res.json());
            dispatch(getFoodsActionCreator(response));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const GetIngredients = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/getIngredients", {
                method: "GET",
            }).then(res => res.json());
            dispatch(getIngredientsActionCreator(response));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const AddExistingIngredient = (foodId:number, ingredientId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        console.log(123);
        const response = await fetch("/addIngredient", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                foodId,
                ingredientId
            })
        }).then(res => res.json());
    }
}
export const AddIngredient = (name:string, foodId:number, formData:FormData):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/addIngredientItem", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    foodId
                })
            });
            setTimeout(() => {
                const href = fetch("/uploadIngredientImage", {
                    method: "POST",
                    body: formData
                }).then(res => res.json())
            }, 500)

        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
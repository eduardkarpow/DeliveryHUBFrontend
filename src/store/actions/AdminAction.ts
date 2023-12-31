import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";
import {getRestsActionCreator, updateRestsActionCreator} from "../AdminRestaurantsReducer";
import {
    deleteFoodActionCreator,
    getFoodsActionCreator,
    getSpecActionCreator,
} from "../AdminFoodReducer";
import {deleteIngredientActionCreator, getIngredientsActionCreator} from "../AdminIngredientsReducer";
import {AdminIngredient} from "../../models/AdminIngredientsModel";
import {AdminFood} from "../../models/AdminFoodModel";
import {getAllActionCreator} from "../AdminOrdersReducer";
import {AdminRestaurant} from "../../models/AdminRestaurantsModel";

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
            const response = await fetch(`/getFoods/?restId=${restId}`, {
                method: "GET"
            }).then(res => res.json());
            dispatch(getFoodsActionCreator(response));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const deleteFoodItem = (foods:AdminFood[], foodId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/deleteFood", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    foodId
                })
            });
            foods = foods.map(el => {
                if(el.id === foodId){
                    el.isVisible = 0;
                }
                return el
            });
            dispatch(deleteFoodActionCreator(foods));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const GetIngredients = (foodId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch(`/getIngredients/?foodId=${foodId}`, {
                method: "GET"
            }).then(res => res.json());
            dispatch(getIngredientsActionCreator(response.ingredients, response.foodIngredients));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const AddExistingIngredient = (foodId:number, ingredientId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
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
            if(response.status !== 200){
                throw new Error(response.message);
            }
        } catch (e:any){
            ErrorHandlerHook(e);
        }

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
export const DeleteIngredient = (ingredients:AdminIngredient[] ,foodId:number, ingredientId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const response = await fetch(`/deleteIngredient/${foodId}/${ingredientId}`, {
            method: "DELETE"
        }).then(res => res.json());
        ingredients = ingredients.filter(el => el.id !== ingredientId);
        dispatch(deleteIngredientActionCreator(ingredients));
    }
}
export const GetOrders = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/getAllOrders", {
                method: "GET",
            }).then(res => res.json());
            dispatch(getAllActionCreator(response.orders, response.statuses));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const UpdateRestaurant = (restaurants:AdminRestaurant[], restId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const response = await fetch("/updateRestaurant", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restId
                })
            });
            restaurants = restaurants.map(el => {
                if (el.id === restId) {
                    el.restVisible = 0;
                }
                return el
            });
            dispatch(updateRestsActionCreator(restaurants));
        } catch (e: any) {
            ErrorHandlerHook(e);
        }
    }
}
export const GetSpecs = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/getSpecializations", {
                method: "GET"
            }).then(res => res.json());
            const specs = response.map((el:any) => el.food_specialization);
            dispatch(getSpecActionCreator(specs));
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
export const AddSpec = (restId: number, spec:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const response = await fetch("/addSpecializationToRestaurant", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restId,
                    spec
                })
            });
            if(response.status !== 200){
                throw new Error("Ресторан уже имеет данную специализацию");
            }
        } catch (e:any){
            ErrorHandlerHook(e);
        }
    }
}
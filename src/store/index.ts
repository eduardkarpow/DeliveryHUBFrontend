import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {AuthReducer} from "./AuthReducer";
import {RestaurantsReducer} from "./RestaurantsReducer";
import {RestaurantItemReducer} from "./RestaurantItemReducer";
import {ReviewsReducer} from "./ReviewsReducer";
import {OrdersReducer} from "./OrdersReducer";
import {AccountReducer} from "./AccountReducer";
import {createHistory} from "create-history";
import {OrderInfoReducer} from "./OrderInfoReducer";
import {IngredientsReducer} from "./IngredientsReduecer";
import {AdminRestaurantsReducer} from "./AdminRestaurantsReducer";
import {AdminFoodReducer} from "./AdminFoodReducer";
import {AdminIngredientsReducer} from "./AdminIngredientsReducer";

export const history = createHistory();


const rootReducer = combineReducers({
    Auth: AuthReducer,
    Restaurants: RestaurantsReducer,
    RestaurantItem: RestaurantItemReducer,
    Reviews: ReviewsReducer,
    Orders: OrdersReducer,
    Account: AccountReducer,
    OrderInfo: OrderInfoReducer,
    Ingredients: IngredientsReducer,
    AdminRestaurants: AdminRestaurantsReducer,
    AdminFood: AdminFoodReducer,
    AdminIngredients: AdminIngredientsReducer
});


export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

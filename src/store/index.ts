import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {AuthReducer} from "./AuthReducer";
import {RestaurantsReducer} from "./RestaurantsReducer";
import {RestaurantItemReducer} from "./RestaurantItemReducer";
import {ReviewsReducer} from "./ReviewsReducer";
const rootReducer = combineReducers({
    Auth: AuthReducer,
    Restaurants: RestaurantsReducer,
    RestaurantItem: RestaurantItemReducer,
    Reviews: ReviewsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

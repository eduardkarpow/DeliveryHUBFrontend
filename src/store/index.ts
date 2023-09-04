import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {AuthReducer} from "./AuthReducer";
const rootReducer = combineReducers({
    Auth: AuthReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {authActionCreator, loginActionCreator, logoutActionCreator, registerActionCreator} from "../AuthReducer";
import {Tokens} from "../../models/TokenModel";

export const testing = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        console.log(await fetch("/test", {
            method: "GET"
        }))
    }
}
export const register = (login:string, password:string, phone:string, firstName:string, lastName:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const tokens:Tokens = await fetch("/register", {
                method: "POST",
                body: JSON.stringify({
                    login,
                    password,
                    phone,
                    firstName,
                    lastName
                })
            }).then(res => {
                return res.json();
            });
            dispatch(registerActionCreator(login, password, phone, firstName, lastName));
            localStorage.setItem("token", tokens.accessToken);
            dispatch(authActionCreator(true));
        } catch(e){
            console.error(e);
        }
    }
}
export const logIn = (login:string, password:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const data = await fetch("/login", {
                method: "POST",
                body: JSON.stringify({
                    login,
                    password
                })
            }).then(res => res.json());
            dispatch(loginActionCreator(data.user.login, data.user.password, data.user.phone_number, data.user.first_name, data.user.last_name));
            localStorage.setItem("token", data.accessToken);
            dispatch(authActionCreator(true));
        } catch (e){
            console.error(e);
        }

    }
}
export const logout = (login:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        await fetch("/logout", {
            method: "POST",
            body: JSON.stringify({
                login
            })
        })
        localStorage.removeItem("token");
        dispatch(logoutActionCreator());
        dispatch(authActionCreator(false));
    }
}
export const checkAuth = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const data = await fetch("/refresh", {
                method: "GET"
            }).then(res => res.json());

            dispatch(loginActionCreator(data.user.login, data.user.password, data.user.phone_number, data.user.first_name, data.user.last_name));
            localStorage.setItem("token", data.accessToken);
            dispatch(authActionCreator(true));
        } catch(e:any){
            console.log(e);
        }

    }
}
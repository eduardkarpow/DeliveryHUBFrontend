import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {
    authActionCreator,
    avatarActionCreator,
    loginActionCreator,
    logoutActionCreator,
    registerActionCreator
} from "../AuthReducer";
import {Tokens} from "../../models/TokenModel";

export const testing = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        console.log(await fetch("/test", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }))
    }
}
export const register = (login:string, password:string, phone:string, firstName:string, lastName:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const tokens:Tokens = await fetch("/register", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
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
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login,
                    password
                })
            }).then(res => res.json());
            dispatch(loginActionCreator(data.user.login, data.user.password, data.user.phone_number, data.user.first_name, data.user.last_name));
            localStorage.setItem("token", data.accessToken);
            dispatch(authActionCreator(true));
            dispatch(avatarActionCreator("http://localhost:8000/"+data.user.avatar_href));
        } catch (e){
            console.error(e);
        }

    }
}
export const logout = (login:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        await fetch("/logout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());

            dispatch(loginActionCreator(data.user.login, data.user.password, data.user.phone_number, data.user.first_name, data.user.last_name));
            localStorage.setItem("token", data.accessToken);
            dispatch(avatarActionCreator("http://localhost:8000/"+data.user.avatar_href));
            dispatch(authActionCreator(true));
        } catch(e:any){
            console.log(e);
        }

    }
}
export const uploadImage = (formData:FormData):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            // @ts-ignore
            for (let key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }

            const href = await fetch("/uploadImage", {
                method: "POST",
                body: formData
            }).then(res => res.json())
            dispatch(avatarActionCreator("http://localhost:8000/"+href.href));
            dispatch(authActionCreator(true));
        }catch (e){
            console.log(e);
        }

    }
}
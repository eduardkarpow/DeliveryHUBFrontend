import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import crypto from "crypto-js";
import {authActionCreator, loginActionCreator, registerActionCreator} from "../AuthReducer";
import {generateTokens, saveToken} from "./TokenAction";
import {PayloadType, Tokens} from "../../models/TokenModel";

export const register = (login:string, password:string, phone:string, firstName:string, lastName:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const candidate = await fetch("http://localhost:8000/users/getUser", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login
                })
            }).then(res => res.json());
            if(candidate.length) throw Error("Пользователь с таким логином существует");
            const hashPassword = crypto.SHA256(password).toString();
            const res = await fetch("http://localhost:8000/users/setUser", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    phone_number: phone,
                    password: hashPassword,
                    first_name: firstName,
                    last_name: lastName
                })
            })
            dispatch(registerActionCreator(login, password, phone, firstName, lastName));
            const payload:PayloadType = {login, password, phone, firstName, lastName};
            const tokens:Tokens = await dispatch(generateTokens(payload));
            const response = await dispatch(saveToken(login, tokens.access_token, tokens.refresh_token));
            localStorage.setItem("token", tokens.access_token);
            dispatch(authActionCreator(true));
        } catch(e){
            console.error(e);
        }
    }
}
export const logIn = (login:string, password:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const user = await fetch("http://localhost:8000/users/getUser", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({login: login})
            }).then(res => res.json());
            if(!user.length){
                throw new Error("User not found");
            }
            const hashPassword = crypto.SHA256(password).toString();
            if(hashPassword !== user[0].password){
                throw new Error("incorrect login or password");
            }

            const payload:PayloadType = {
                login: user.login,
                password: user.password,
                phone: user.phone,
                firstName: user.first_name,
                lastName: user.last_name
            }
            dispatch(loginActionCreator(user.login, user.password, user.phone, user.first_name, user.last_name));
            const tokens:Tokens = await dispatch(generateTokens(payload));
            const response = await dispatch(saveToken(login, tokens.access_token, tokens.refresh_token));
            localStorage.setItem("token", tokens.access_token);
            dispatch(authActionCreator(true));
        } catch (e){
            console.error(e);
        }

    }
}
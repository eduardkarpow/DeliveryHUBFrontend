import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
//import bcrypt from "bcrypt";
import {registerActionCreator} from "../AuthReducer";
import {generateTokens, saveToken} from "./TokenAction";
import {PayloadType, Tokens} from "../../models/TokenModel";
import {JWTPayload} from "jose";

export const register = (login:string, password:string, phone:string, firstName:string, lastName:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const candidate = await fetch("http://localhost:8000/users/getUser", {
                method: "POST",
                body: JSON.stringify({
                    login: login
                })
            });
            if(candidate) throw Error("Пользователь с таким логином существует");
            const hashPassword = password;//await bcrypt.hash(password, 3);
            const res = await fetch("http://localhost:8000/users/setUser", {
                method: "POST",
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
            //const tokens:Tokens = generateTokens(payload);
           // const response = await dispatch(saveToken(login, tokens.access_token, tokens.refresh_token))

        } catch(e){
            console.error(e);
        }
    }
}
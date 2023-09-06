import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {authActionCreator, loginActionCreator, registerActionCreator} from "../AuthReducer";
import {Tokens} from "../../models/TokenModel";
import {useNavigate} from "react-router-dom";

export const register = (login:string, password:string, phone:string, firstName:string, lastName:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const tokens:Tokens = await fetch("http://localhost:8000/register", {
                method: "POST",
                mode: "cors",
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
            dispatch(authActionCreator(true));
        } catch(e){
            console.error(e);
        }
    }
}
export const logIn = (login:string, password:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const data = await fetch("http://localhost:8000/login", {
                method: "POST",
                mode: "cors",
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
        } catch (e){
            console.error(e);
        }

    }
}
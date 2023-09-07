import {AuthStateModel} from "../models/AuthModel";
import {AUTH, AuthActions, LOGIN, LOGOUT, REGISTER} from "../models/AuthActions";


const initialState:AuthStateModel = {
    login: "",
    phone: "",
    password: "",
    firstName: "",
    lastName: "",
    isAuth: false
}

export const AuthReducer = (state:AuthStateModel=initialState, action:AuthActions):AuthStateModel => {
    switch (action.type){
        case "LOGIN":

            return {...state, login: action.login, password: action.password, phone: action.phone, firstName:action.firstName, lastName:action.lastName};
        case "REGISTER":

            return {...state, login: action.login, password: action.password, phone: action.phone, firstName:action.firstName, lastName:action.lastName};
        case "LOGOUT":

            return {...state, login: "", password: "", phone: "", firstName: "", lastName: ""};
        case "AUTH":

            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
}

export const loginActionCreator = (login: string, password: string, phone:string, firstName:string, lastName:string):LOGIN => {return {type:"LOGIN", login, password, phone, firstName, lastName}};
export const registerActionCreator = (login:string, password:string, phone:string, firstName:string, lastName:string):REGISTER => {return {type:"REGISTER", login, password, phone, firstName, lastName}};
export const logoutActionCreator = ():LOGOUT => {return {type:"LOGOUT"}};
export const authActionCreator = (isAuth:boolean):AUTH => {return {type:"AUTH", isAuth: isAuth}};
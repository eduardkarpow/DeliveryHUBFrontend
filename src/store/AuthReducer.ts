import {AuthStateModel} from "../models/AuthModel";
import {AuthActions, LOGIN, LOGOUT, REGISTER} from "../models/AuthActions";


const initialState:AuthStateModel = {
    login: "",
    phone: "",
    password: "",
    firstName: "",
    lastName: ""
}

export const AuthReducer = (state:AuthStateModel=initialState, action:AuthActions):AuthStateModel => {
    switch (action.type){
        case "LOGIN":

            return state;
            break;
        case "REGISTER":

            return state;
            break;
        case "LOGOUT":

            return state;
            break;
        default:
            return state;
            break;
    }
}

export const loginActionCreator = (login: string, password: string):LOGIN => {return {type:"LOGIN", login, password}};
export const registerActionCreator = (login:string, password:string, phone:string, firstName:string, lastName:string):REGISTER => {return {type:"REGISTER", login, password, phone, lastName, firstName}};
export const logoutActionCreator = ():LOGOUT => {return {type:"LOGOUT"}};
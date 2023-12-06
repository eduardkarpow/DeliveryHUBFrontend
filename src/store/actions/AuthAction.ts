import {ThunkAction} from "redux-thunk";
import {history, RootState} from "../index";
import {AnyAction} from "redux";
import {
    authActionCreator,
    avatarActionCreator, loadingActionCreator,
    loginActionCreator,
    logoutActionCreator,
    registerActionCreator
} from "../AuthReducer";
import {Tokens} from "../../models/TokenModel";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";
import {AdminOrder} from "../../models/AdminOrdersModel";
import {updateOrderActionCreator} from "../AdminOrdersReducer";

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
            dispatch(registerActionCreator(login, password, phone, firstName, lastName, 0));
            localStorage.setItem("token", tokens.accessToken);
            window.location.reload();
        } catch(e:any){
            ErrorHandlerHook(e);
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
            dispatch(loginActionCreator(data.user.login, data.user.password, data.user.phone_number, data.user.first_name, data.user.last_name, data.user.is_admin));
            localStorage.setItem("token", data.accessToken);
            dispatch(authActionCreator(true));
            dispatch(avatarActionCreator(data.user.avatar_href));
        } catch (e:any){
            ErrorHandlerHook(e);
        }

    }
}
export const logout = (login:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
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
            window.location.reload();
        } catch (e:any){
            ErrorHandlerHook(e);
        }

    }
}
export const checkAuth = ():ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const resp = await fetch("/refresh", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if(resp.status === 402){
                await setTimeout(() => {
                    if(!window.location.pathname.includes("/login")){
                        history.push("/login");
                        window.location.reload();
                    }

                },200)
                return 1
            }
            const data = await resp.json();

            dispatch(loginActionCreator(data.user.login, data.user.password, data.user.phone_number, data.user.first_name, data.user.last_name, data.user.is_admin));
            localStorage.setItem("token", data.accessToken);
            dispatch(avatarActionCreator(data.user.avatar_href));
            dispatch(authActionCreator(true));
        } catch(e:any){
            ErrorHandlerHook(e);
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
            dispatch(avatarActionCreator(href.href));
            dispatch(authActionCreator(true));
        }catch (e:any){
            ErrorHandlerHook(e);
        }

    }
}
export const updateOrderStatus = (orders:AdminOrder[], id:number, status:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            await fetch("/updateOrderStatus", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    status
                })
            })
        } catch (e: any) {
            ErrorHandlerHook(e);
        }
        orders = orders.map(el => {
            if (el.id === id) {
                el.status = status
            }
            return el
        })
        dispatch(updateOrderActionCreator(orders));
    }
}
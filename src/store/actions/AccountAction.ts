import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {LocationModel} from "../../models/AccountModel";
import {addLocationActionCreator, getLocationsActionCreator} from "../AccountReducer";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";

export const getAllLocations = (login:string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try{
            const locations:LocationModel[] = await fetch(`/getLocations/?login=${login}`, {
                method: "GET"
            }).then(res => res.json());
            dispatch(getLocationsActionCreator(locations));
        } catch(e:any){
            ErrorHandlerHook(e);
        }

    }
}
export const addLocation = (login:string, locationName:string, location:string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try {
            console.log(JSON.stringify({
                login,
                locationName,
                location
            }));
            const locations = await fetch("/addLocation", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login,
                    locationName,
                    location
                })
            });
            dispatch(addLocationActionCreator({location, locationName}));
        } catch (e:any){
            ErrorHandlerHook(e);
        }

    }
}
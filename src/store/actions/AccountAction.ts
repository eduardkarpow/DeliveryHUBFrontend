import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {LocationModel} from "../../models/AccountModel";
import {addLocationActionCreator, getLocationsActionCreator} from "../AccountReducer";

export const getAllLocations = (login:string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        const locations:LocationModel[] = await fetch("/getLocations", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login
            })
        }).then(res => res.json());
        dispatch(getLocationsActionCreator(locations));
    }
}
export const addLocation = (login:string, locationName:string, location:string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
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
    }
}
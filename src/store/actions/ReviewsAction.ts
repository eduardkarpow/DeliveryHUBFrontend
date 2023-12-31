import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {addReviewActionCreator, getReviewsActionCreator} from "../ReviewsReducer";
import {ErrorHandlerHook} from "../../hooks/ErrorHandler";

export const addReview = (text:string, grade:number, rating:number, restId:number, login:string, avatar:string, id:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try{
            const Reviews = await fetch("/addReview", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    grade: grade,
                    rating: rating,
                    restaurants_id_restaurants: restId,
                    users_login: login
                })
            }).then(res => res.json());
            dispatch(addReviewActionCreator({
                id_reviews: id,
                text: text,
                grade: grade,
                rating: rating,
                avatar_href: avatar
            }));
        } catch (e:any) {
            ErrorHandlerHook(e);
        }

    }
}
export const getAllReviews = (restId:number):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        try {
            const reviews = await fetch(`/getAllReviews/?id=${restId}`, {
                method: "GET"

            }).then(res => res.json());
            dispatch(getReviewsActionCreator(reviews));
        } catch (e:any) {
            ErrorHandlerHook(e);
        }
    }
}
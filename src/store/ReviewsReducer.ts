import {ReviewModel, ReviewsStateModel} from "../models/ReviewsModel";
import {ADD_REVIEW, GET_REVIEWS} from "../models/ReviewsActions";

const initialState:ReviewsStateModel = {
    reviews: []
}

export const ReviewsReducer = (state: ReviewsStateModel = initialState, action: any) => {
    switch (action.type){
        case "GET_REVIEWS":
            return {...state, reviews: [...action.reviews]};
        case "ADD_REVIEW":
            return {...state, reviews: [...state.reviews, action.review]};
        default:
            return state;
    }
}
export const getReviewsActionCreator = (reviews:ReviewModel[]):GET_REVIEWS => {return {type: "GET_REVIEWS", reviews:reviews}};
export const addReviewActionCreator = (review:ReviewModel):ADD_REVIEW => {return {type: "ADD_REVIEW", review: review}};
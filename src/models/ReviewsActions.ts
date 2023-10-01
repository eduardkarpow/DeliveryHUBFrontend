import {ReviewModel} from "./ReviewsModel";

export type ReviewsActions = GET_REVIEWS | ADD_REVIEW;
export type ADD_REVIEW = {
    type: "ADD_REVIEW",
    review: ReviewModel
}

export type GET_REVIEWS = {
    type: "GET_REVIEWS",
    reviews: ReviewModel[]
}
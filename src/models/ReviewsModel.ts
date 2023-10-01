
export interface ReviewsStateModel{
    reviews: ReviewModel[];
}

export interface  ReviewModel{
    id_reviews: number;
    grade: number;
    rating: number;
    text: string;
    avatar_href: string;
}
export interface ReviewProps {
    grade: number;
    rating: number;
    text: string;
    avatar_href: string;
}
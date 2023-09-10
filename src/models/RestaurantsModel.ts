
export interface RestaurantsStateModel {
    restaurants: RestaurantModel[];
    specializations: SpecializationModel[];
}

export interface RestaurantModel{
    id_restaurants: number;
    location: string;
    rating: number;
    price_rating: number;
    name: string;
    restaurant_image_href: string;
    specs: string[];
}
export interface SpecializationModel{
    food_specialization: string;
}
export interface RestaurantProps {
    image_href: string;
    name: string;
    rating: number;
    priceRating: number;
    location: string;
    specs: string[];
}
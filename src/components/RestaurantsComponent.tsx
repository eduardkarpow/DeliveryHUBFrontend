import React, {useEffect} from 'react';
import styles from "../styles/restaurants.module.css";
import RestaurantItemComponent from "./RestaurantItemComponent";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {AppDispatch, RootState} from "../store";
import {getAllRestaurants, getAllSpecializations, getSpecialRestaurants} from "../store/actions/RestaurantsAction";
import {ThunkDispatch} from "redux-thunk";
const RestaurantsComponent = () => {

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const restaurants = useAppSelector(store => store.Restaurants.restaurants);
    const specs = useAppSelector(store => store.Restaurants.specializations);

    useEffect(() => {
        dispatch(getAllRestaurants());
        dispatch(getAllSpecializations());
    },[])

    const addClass = (e:any) => {
        Array.from(document.querySelectorAll("."+styles.categories+">span")).map(spa => spa.classList.remove(styles.active));
        e.target.classList.add(styles.active);
        dispatch(getSpecialRestaurants({food_specializations_food_specialization: e.target.innerText}));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.categories}>
                {specs.map((spec, index) => <span onClick={addClass} key = {spec.food_specialization}>{spec.food_specialization}</span>)}
            </div>
            <div className={styles.prices}>
                <span>$</span><span className={styles.active}>$$</span><span>$$$</span>
            </div>
            <div className={styles.rating}>
                <span className={styles.active}>above 4</span><span>above 3</span><span>above 2</span>
            </div>
            {restaurants.map((restaurant, index) => <NavLink to={"/restaurants/"+restaurant.id_restaurants}><RestaurantItemComponent
                image_href={restaurant.restaurant_image_href}
                name={restaurant.name} rating={restaurant.rating} priceRating={restaurant.price_rating}
                location={restaurant.location} specs={restaurant.specs} key={restaurant.id_restaurants}/></NavLink>
            )}

        </div>
    );
};

export default RestaurantsComponent;
import React, {useEffect} from 'react';
import styles from "../styles/restaurantpage.module.css";
import RestaurantItemComponent from "./RestaurantItemComponent";
import MenuItemComponent from "./MenuItemComponent";
import ReviewItemComponent from "./ReviewItemComponent";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {RootState, store} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {getRestaurant} from "../store/actions/RestaurantItemAction";
import {useParams} from "react-router-dom";
const RestaurantPageComponent = () => {

    const params = useParams();

    useEffect(() => {
        dispatch(getRestaurant(Number(params.restid)));
    },[])

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const restaurant = useAppSelector(store => store.RestaurantItem.restaurant);

    return (
        <div className={styles.wrapper}>
            {<RestaurantItemComponent image_href={restaurant.restaurant_image_href}
                                      name={restaurant.name} rating={restaurant.rating}
                                      priceRating={restaurant.price_rating} location={restaurant.location}
                                      specs={restaurant.specs}/>
            }
            <div className={styles.menu_title}>MENU</div>
            <div className={styles.menu}>
                <MenuItemComponent/>
                <MenuItemComponent/>
                <MenuItemComponent/>
                <MenuItemComponent/>
                <MenuItemComponent/>
            </div>
            <div className={styles.menu_title}>REVIEWS</div>
            <div className={styles.add_review}>
                <textarea name="review" ></textarea>
                <input type="text"/>
                <button className={styles.review_button}>REVIEW</button>
            </div>
            <div className={styles.reviews}>
                <ReviewItemComponent/>
                <ReviewItemComponent/>
                <ReviewItemComponent/>
                <ReviewItemComponent/>
            </div>
        </div>
    );
};

export default RestaurantPageComponent;
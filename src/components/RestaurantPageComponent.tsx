import React from 'react';
import styles from "../styles/restaurantpage.module.css";
import RestaurantItemComponent from "./RestaurantItemComponent";
import MenuItemComponent from "./MenuItemComponent";
import ReviewItemComponent from "./ReviewItemComponent";
const RestaurantPageComponent = () => {
    return (
        <div className={styles.wrapper}>
            <RestaurantItemComponent/>
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
import React from 'react';
import styles from "../styles/restaurants.module.css";
import RestaurantItemComponent from "./RestaurantItemComponent";
import {NavLink} from "react-router-dom";
const RestaurantsComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.categories}>
                <span>Burgers</span><span>Pizza</span><span className={styles.active}>Sushi</span>
            </div>
            <div className={styles.prices}>
                <span>$</span><span className={styles.active}>$$</span><span>$$$</span>
            </div>
            <div className={styles.rating}>
                <span className={styles.active}>above 4</span><span>above 3</span><span>above 2</span>
            </div>
            <NavLink to="/restaurants/1"><RestaurantItemComponent/></NavLink>
            <RestaurantItemComponent/>
            <RestaurantItemComponent/>
            <RestaurantItemComponent/>

        </div>
    );
};

export default RestaurantsComponent;
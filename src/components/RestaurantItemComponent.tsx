import React from 'react';
import styles from "../styles/restaurants.module.css";
const RestaurantItemComponent = () => {
    return (
        <div className={styles.restaurant_item}>
            <img src="https://img.freepik.com/premium-photo/cozy-restaurant-with-people-waiter_175935-230.jpg" alt="restaurant image"/>
            <div className={styles.content}>
                <div className={styles.restaurant_name}>Burger Wille</div>
                <div className={styles.info}><div>4.3</div><div>(111)</div><div>$$</div></div>
                <div className={styles.category}><div>Burger</div></div>
                <div className={styles.location}>wall street 27</div>
            </div>
        </div>
    );
};

export default RestaurantItemComponent;
import React from 'react';
import styles from "../styles/restaurants.module.css";
import {RestaurantProps} from "../models/RestaurantsModel";
import {BASE_URL} from "../index";
const RestaurantItemComponent = (props:RestaurantProps) => {
    return (
        <div className={styles.restaurant_item}>
            <img src={`${BASE_URL}/${props.image_href}`} alt={props.name}/>
            <div className={styles.content}>
                <div className={styles.restaurant_name}>{props.name}</div>
                <div className={styles.info}><div>{props.rating}</div><div></div>
                    <div>
                        {Array(props.priceRating).fill(0).map((item, index) => <span key={index}>₽</span>)}
                    </div>
                </div>
                <div className={styles.category}>{props.specs.map(spec => <div>{spec}</div>)}</div>
                <div className={styles.location}>{props.location}</div>
            </div>
        </div>
    );
};

export default RestaurantItemComponent;
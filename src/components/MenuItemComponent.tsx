import React, {useState} from 'react';
import styles from "../styles/restaurantpage.module.css";
import {NavLink} from "react-router-dom";
import {MenuProps} from "../models/RestaurantItemModel";

const MenuItemComponent = (props:MenuProps) => {

    const [quantity, setQuantity] = useState(0);

    return (
        <div className={styles.menu_item}>
            <NavLink to={`/restaurants/${props.restId}/${props.id}`}><img src={`http://localhost:8000/${props.image_href}`} alt={props.name}/></NavLink>
            <div>{props.name}</div>
            <div className={styles.food_price}>{props.price + " ₽"}</div>
            {
                quantity>0
                    ?
                    <div className={styles.orderButtons}>
                        <button className={styles.button} onClick={e => setQuantity(quantity+1)}>+</button>
                        <div className={styles.quantity}>{quantity}</div>
                        <button className={styles.button} onClick={e => setQuantity(quantity-1)}>-</button>
                    </div>
                    :
                    <button className={styles.button} onClick={e => setQuantity(quantity+1)}>+ Order</button>
            }
        </div>
    );
};

export default MenuItemComponent;
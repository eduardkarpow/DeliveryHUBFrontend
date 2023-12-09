import React from 'react';
import styles from "../styles/orderinfo.module.css";
import {NavLink} from "react-router-dom";
import {menuPositionProps} from "../models/OrderInfoModel";
import {BASE_URL} from "../index";
const PositionItemComponent = (props:menuPositionProps) => {
    return (
        <div className={styles.order_item}>
            <div className={styles.item_amount}>{props.amount}</div>
            <NavLink to={`/restaurants/${props.restId}/${props.foodId}`}><img src={`${BASE_URL}/${props.image}`} alt="burger"/></NavLink>
            <div className={styles.item_name}>{props.name}</div>
            <div className={styles.item_price}>{props.price}$</div>

        </div>
    );
};

export default PositionItemComponent;
import React, {useState} from 'react';
import styles from "../styles/restaurantpage.module.css";
import {NavLink} from "react-router-dom";
import {MenuProps} from "../models/RestaurantItemModel";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {decrement, increment} from "../store/actions/RestaurantItemAction";

const MenuItemComponent = (props:MenuProps) => {

    const menu = useAppSelector(store => store.RestaurantItem.menu);
    const quantity = useAppSelector(store => store.RestaurantItem.menu[props.index].amount);
    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const isAuth = useAppSelector(store => store.Auth.isAuth);

    return (
        <div className={styles.menu_item}>
            <NavLink to={`/restaurants/${props.restId}/${props.id}`}><img src={`http://localhost:8000/${props.image_href}`} alt={props.name}/></NavLink>
            <div>{props.name}</div>
            <div className={styles.food_price}>{props.price + " ₽"}</div>
            {
                quantity>0
                    ?
                    <div className={styles.orderButtons}>
                        <button className={styles.button} onClick={e => dispatch(increment(props.index, menu))}>+</button>
                        <div className={styles.quantity}>{quantity}</div>
                        <button className={styles.button} onClick={e => dispatch(decrement(props.index, menu))}>-</button>
                    </div>
                    :
                    isAuth ? <button className={styles.button} onClick={e => dispatch(increment(props.index, menu))}>+ Заказать</button> : null
            }
        </div>
    );
};

export default MenuItemComponent;
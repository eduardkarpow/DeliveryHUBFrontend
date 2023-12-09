import React, {useState} from 'react';
import styles from "../styles/orderModal.module.css";
import {OrderItemProps} from "../models/OrdersModel";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {decrement, increment} from "../store/actions/RestaurantItemAction";
import {BASE_URL} from "../index";

const OrderElementComponent = (props:OrderItemProps) => {

    const menu = useAppSelector(store => store.RestaurantItem.menu);
    const amount = useAppSelector(store => store.RestaurantItem.menu[props.id].amount);

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();

    return (
        <div className={styles.order_element}>
            <div className={styles.element_info}>
                <div className={styles.element_img}><img src={`${BASE_URL}/${props.image_href}`} alt=""/></div>
                <div className={styles.element_name}>{props.name}</div>
            </div>
            <div className={styles.element_order_info}>
                <div className={styles.amount_block}>
                    <button onClick={e=>amount ? dispatch(decrement(props.id, menu)):null}>-</button>
                    <div className={styles.amount}>{amount}</div>
                    <button onClick={e=>dispatch(increment(props.id, menu))}>+</button>
                </div>
                <div className={styles.price}>{props.price*amount} ₽</div>
            </div>

        </div>
    );
};

export default OrderElementComponent;
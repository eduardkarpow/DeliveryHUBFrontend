import React from 'react';
import styles from "../styles/orderlist.module.css";
import OrderItemComponent from "./OrderItemComponent";
const OrderListComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.caption}>YOUR ORDERS</div>
            <div className={styles.order_list}>
                <OrderItemComponent/>
                <OrderItemComponent/>
                <OrderItemComponent/>
                <OrderItemComponent/>
                <OrderItemComponent/>
            </div>
        </div>
    );
};

export default OrderListComponent;
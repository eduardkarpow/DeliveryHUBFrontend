import React from 'react';
import styles from "../styles/orderinfo.module.css";
import PositionItemComponent from "./PositionItemComponent";

const OrderInfoComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.restaurant_name}>ORDER FROM <span>Burger Wille</span></div>
            <section className={styles.restaurant_info}>
                <div className={styles.restaurant_image}>
                    <img src="https://img.freepik.com/premium-photo/cozy-restaurant-with-people-waiter_175935-230.jpg" alt="restaurant"/>
                </div>
                <div className={styles.restaurant_caption}>
                    <div className={styles.price}>12$</div>
                    <div className={styles.datetime}>
                        <div className={styles.time}>12:32</div>
                        <div className={styles.date}>12 September</div>
                    </div>
                    <div className={styles.status}>FINISHED</div>

                </div>
            </section>
            <div className={styles.order_caption}>ORDER DETAILS</div>
            <section className={styles.order_items}>
                <PositionItemComponent/>
                <PositionItemComponent/>
                <PositionItemComponent/>
            </section>
        </div>
    );
};

export default OrderInfoComponent;
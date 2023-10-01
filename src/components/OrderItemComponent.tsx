import React from 'react';
import styles from "../styles/orderlist.module.css";
import {NavLink} from "react-router-dom";

const OrderItemComponent = () => {
    return (
            <div className={styles.order_item}>
                <div className={styles.info}>
                    <div className={styles.image}>
                        <img src="https://img.freepik.com/premium-photo/cozy-restaurant-with-people-waiter_175935-230.jpg" alt="restaurant"/>
                    </div>
                    <div>
                        <div className={styles.price}>12$</div>
                        <div className={styles.time}>12:32</div>
                        <div className={styles.date}>12 September</div>
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <NavLink to="/orders/1" className={styles.button}>MORE INFO</NavLink>
                    <div className={styles.status}>FINISHED</div>
                </div>
            </div>
    );
};

export default OrderItemComponent;
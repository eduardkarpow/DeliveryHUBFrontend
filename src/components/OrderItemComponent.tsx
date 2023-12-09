import React from 'react';
import styles from "../styles/orderlist.module.css";
import {NavLink} from "react-router-dom";
import {OrderProps} from "../models/OrdersModel";
import {BASE_URL} from "../index";

const OrderItemComponent = (props:OrderProps) => {
    return (
            <div className={styles.order_item}>
                <div className={styles.info}>
                    <div className={styles.image}>
                        <img src={`${BASE_URL}/${props.restImage}`} alt="restaurant"/>
                    </div>
                    <div>
                        <div className={styles.price}>{props.fullPrice} ₽</div>
                        <div className={styles.time}>{props.time.toString()}</div>
                        <div className={styles.date}>{props.date.toString()}</div>
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <NavLink to={`/orders/${props.id}`} className={styles.button}>Подробная информация</NavLink>
                    <div className={styles.status} style={{color: `#${props.statusColor}`}}>{props.status}</div>
                </div>
            </div>
    );
};

export default OrderItemComponent;
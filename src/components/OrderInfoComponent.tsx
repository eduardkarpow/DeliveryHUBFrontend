import React, {useEffect} from 'react';
import styles from "../styles/orderinfo.module.css";
import PositionItemComponent from "./PositionItemComponent";
import {NavLink, useParams} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {getOrderInfo} from "../store/actions/OrdersAction";



const OrderInfoComponent = () => {
    const params = useParams();



    useEffect(() => {
        dispatch(getOrderInfo(Number(params.orderid)));
    }, [])

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const orderInfo = useAppSelector(store => store.OrderInfo);

    return (
        <div className={styles.wrapper}>
            <div className={styles.restaurant_name}>Заказ из <span>{orderInfo.name}</span></div>
            <section className={styles.restaurant_info}>
                <div className={styles.restaurant_image}>
                    <NavLink to = {`/restaurants/${orderInfo.restId}`}>
                        <img src={`http://localhost:8000/${orderInfo.restImage}`} alt="restaurant"/>
                    </NavLink>
                </div>
                <div className={styles.restaurant_caption}>
                    <div className={styles.price}>{orderInfo.fullPrice}₽</div>
                    <div className={styles.datetime}>
                        <div className={styles.time}>{orderInfo.datetime.slice(11,16)}</div>
                        <div className={styles.date}>{orderInfo.datetime.slice(5,10)}</div>
                    </div>
                    <div className={styles.status}
                         style={{color: `#${orderInfo.statusColor}`}}>{orderInfo.status}</div>

                </div>
            </section>
            <div className={styles.order_caption}>Элементы заказа</div>
            <section className={styles.order_items}>
                {orderInfo.orderElements.map(el => <PositionItemComponent key={el.id}
                    name={el.name} price={el.price} image={el.image} amount={el.amount} foodId={el.foodId} restId={orderInfo.restId}/> )}
            </section>
        </div>
    );
};

export default OrderInfoComponent;
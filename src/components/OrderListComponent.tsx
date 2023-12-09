import React, {useEffect} from 'react';
import styles from "../styles/orderlist.module.css";
import OrderItemComponent from "./OrderItemComponent";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {Order} from "../models/OrdersModel";
import {ThunkDispatch} from "redux-thunk";
import {history, RootState} from "../store";
import {getAllOrders} from "../store/actions/OrdersAction";
import {checkAuth} from "../store/actions/AuthAction";
import {ErrorHandlerHook} from "../hooks/ErrorHandler";
const OrderListComponent = () => {


    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const login = useAppSelector(store => store.Auth.login);

    useEffect(() => {
        dispatch(getAllOrders(login));
        try{
            if(isAuth && localStorage.getItem("token")){

            }
            else if(!isAuth && localStorage.getItem("token")){
                dispatch(checkAuth());
            } else{
                history.push("/login");
                window.location.reload();
            }
        } catch(e:any){
            ErrorHandlerHook(e);
        }
    }, [login])

    const orders:Order[] = useAppSelector(store=>store.Orders.orders);
    const isAuth = useAppSelector(store => store.Auth.isAuth);

    return (
        <div className={styles.wrapper}>
            <div className={styles.caption}>ВАШИ ЗАКАЗЫ</div>
            <div className={styles.order_list}>
                {orders.map((el:Order) => <OrderItemComponent id={el.id_orders} fullPrice={el.price}
                                                status={el.order_status} statusColor={el.status_color}
                                                restImage={el.restaurant_image_href}
                                                time={el.datetime.slice(11,16)}
                                                date={el.datetime.slice(5,10)}
                                                key={el.id_orders}
                />)}

            </div>
        </div>
    );
};

export default OrderListComponent;
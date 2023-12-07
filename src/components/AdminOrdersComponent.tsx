import React, {useEffect, useState} from 'react';
import styles from "../styles/admin.module.css";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {RootState} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {GetOrders} from "../store/actions/AdminAction";
import {updateOrderStatus} from "../store/actions/AuthAction";
import {ErrorHandlerHook} from "../hooks/ErrorHandler";

const AdminOrdersComponent = () => {

    const [id, setId] = useState(0);
    const [status, setStatus] = useState("");

    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();

    useEffect(() => {
        dispatch(GetOrders());
    }, [])

    const orders = useAppSelector(state => state.AdminOrders.orders);
    const statuses = useAppSelector(state => state.AdminOrders.statuses);

    const updateOrder = (event:any) => {
        event.preventDefault();
        if(!(status in statuses)) {
            ErrorHandlerHook(new Error("некорректный статус"));
            return;
        }
        dispatch(updateOrderStatus(orders, id, status));
        setId(0);
        setStatus("");
    }

    return (
        <section className={styles.wrapper}>
            <form acceptCharset={"utf-8"} className={styles.form}>
                <label htmlFor="name">Айди заказа</label>
                <input type="text" id="name"
                       placeholder="Введите айди заказа"
                       value={id}
                       onChange={e => setId(Number(e.target.value))} />
                <label htmlFor="location" className={styles.location}>
                    <input list="browsers"  name="location" value={status} onChange={e => setStatus(e.target.value)}/>
                    <datalist id="browsers">
                        {statuses.map(status => {
                            return <option value={status} key={status}>{status}</option>
                        })}

                    </datalist>
                    <div className={styles.arrow}>
                        <span></span>
                        <span></span>
                    </div>
                </label>
                <button onClick={updateOrder}>Изменить</button>
            </form>
            <div>
                <div className={styles.buttons}>
                    <NavLink to={"/admin/restaurants"}>админка ресторанов</NavLink>
                    <NavLink to={"/admin/orders"}>админка заказов</NavLink>
                </div>
                {orders.map(order => {
                    return <NavLink to={`/orders/${order.id}`} className={styles.restaurant_item}>
                        <div className={styles.image}>
                            <img src={`http://localhost:8000/${order.image}`} alt=""/>

                        </div>
                        <div className={styles.info}>
                            <div className={styles.id}>id: {order.id}</div>
                            <div>{order.status}</div>
                        </div>
                    </NavLink>
                })}


            </div>
        </section>
    );
};

export default AdminOrdersComponent;
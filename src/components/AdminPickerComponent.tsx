import React from 'react';
import styles from "../styles/admin.module.css";
import {NavLink} from "react-router-dom";

const AdminPickerComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                <NavLink to={"/admin/restaurants"}>добавить ресторан</NavLink>
                <NavLink to={"/admin/food"}>добавить меню</NavLink>
                <NavLink to={"/admin/ingredients"}>добавить ингридиент</NavLink>
            </div>
            <div className={styles.restaurant_item}>
                <div className={styles.image}><img src="http://localhost:8000/images/restaurants/7swTElXJfHХинкали ресторан.jpg" alt=""/></div>
                <div className={styles.info}>
                    <div className={styles.caption}>оалывоавыла</div>
                    <div className={styles.id}>12</div>
                </div>
            </div>
            <div className={styles.restaurant_item}>
                <div className={styles.image}><img src="http://localhost:8000/images/restaurants/7swTElXJfHХинкали ресторан.jpg" alt=""/></div>
                <div className={styles.info}>
                    <div className={styles.caption}>оалывоавыла</div>
                    <div className={styles.id}>id: 12</div>
                </div>

            </div>
        </div>
    );
};

export default AdminPickerComponent;
import React from 'react';
import {Route} from "react-router-dom";
import AdminRestaurantsComponent from "./components/AdminRestaurantsComponent";
import AdminFoodComponent from "./components/AdminFoodComponent";
import AdminIngredientsComponent from "./components/AdminIngredientsComponent";
import {useAppSelector} from "./hooks/ReduxHooks";
import styles from "./styles/admin.module.css";

const AdminRouteComponent = (Component:any) => {

    const isAdmin = useAppSelector(store => store.Auth.isAdmin);

    return (
        isAdmin ?
        <Component/>
            :
            <div className={styles.error404}>
                У вас нет прав доступа
            </div>
    );
};

export default AdminRouteComponent;
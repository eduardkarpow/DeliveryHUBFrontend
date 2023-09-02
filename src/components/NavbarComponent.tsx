import React from 'react';
import styles from "../styles/navbar.module.css";
import {NavLink} from "react-router-dom";

const NavbarComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>Delivery<span>HUB</span></div>
            <div className={styles.content}>
                <NavLink to="/restaurants">Restaurants</NavLink>
                <NavLink to="/orders">Orders</NavLink>
            </div>
            <div className={styles.auth}>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </div>
    );
};

export default NavbarComponent;
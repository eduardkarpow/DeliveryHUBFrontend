import React from 'react';
import styles from "../styles/restaurantpage.module.css";
import {NavLink} from "react-router-dom";

const MenuItemComponent = () => {
    return (
        <div className={styles.menu_item}>
            <NavLink to="/restaurants/1/1"><img src="https://media.istockphoto.com/id/1188412964/photo/hamburger-with-cheese-and-french-fries.jpg?b=1&s=612x612&w=0&k=20&c=_JT2iitrsfuPYOmYHO336VFWeximXvauz6tRG4-7OVI=" alt="burger"/></NavLink>
            <div>Burger</div>
            <button className={styles.button}>+ Order</button>
        </div>
    );
};

export default MenuItemComponent;
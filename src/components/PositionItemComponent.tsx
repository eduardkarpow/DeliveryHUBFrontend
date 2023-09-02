import React from 'react';
import styles from "../styles/orderinfo.module.css";
import {NavLink} from "react-router-dom";
const PositionItemComponent = () => {
    return (
        <div className={styles.order_item}>
            <div className={styles.item_amount}>2</div>
            <NavLink to="../../restaurants/1"><img src="https://media.istockphoto.com/id/1188412964/photo/hamburger-with-cheese-and-french-fries.jpg?b=1&s=612x612&w=0&k=20&c=_JT2iitrsfuPYOmYHO336VFWeximXvauz6tRG4-7OVI=" alt="burger"/></NavLink>
            <div className={styles.item_name}>Burger</div>
            <div className={styles.item_price}>4$</div>

        </div>
    );
};

export default PositionItemComponent;
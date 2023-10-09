import React, {useState} from 'react';
import styles from "../styles/orderModal.module.css";

const OrderElementComponent = () => {
    const [amount, setAmount] = useState<number>(0);
    return (
        <div className={styles.order_element}>
            <div className={styles.element_info}>
                <div className={styles.element_img}><img src="http://localhost:8000/images/foods/pizzas/Pizza14.jpg" alt=""/></div>
                <div className={styles.element_name}>Pizza</div>
            </div>
            <div className={styles.element_order_info}>
                <div className={styles.amount_block}>
                    <span onClick={e=>amount ? setAmount(amount-1):setAmount(0)}>-</span>
                    <div className={styles.amount}>{amount}</div>
                    <span onClick={e=>setAmount(amount+1)}>+</span>
                </div>
                <div className={styles.price}>100</div>
            </div>

        </div>
    );
};

export default OrderElementComponent;
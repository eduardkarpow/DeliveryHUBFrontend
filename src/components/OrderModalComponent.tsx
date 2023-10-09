import React, {useState} from 'react';
import styles from "../styles/orderModal.module.css";
import OrderElementComponent from "./OrderElementComponent";

function OrderModalComponent() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isFirst, setIsFirst] = useState<boolean>(true);

    return (
        isOpen ?
            (<div className={styles.mainContainer}>
            <div className={styles.modal}>
                <div className={styles.exit} onClick={e => setIsOpen(false)}>
                    <span></span>
                    <span></span>
                </div>
                {isFirst ?
                <div className={styles.firstSlide}>
                    <div className={styles.restaurant}>
                        <div className={styles.rest_img}><img src="http://localhost:8000/images/restaurants/Rest8.jpg" alt=""/></div>
                        <div className={styles.rest_info}>
                            <div className={styles.rest_name}>KFC</div>
                            <div className={styles.rest_location}>Moscow patriarchie prydi d. 12</div>
                        </div>
                    </div>
                    <div className={styles.order_elements}>
                        <OrderElementComponent/>
                        <OrderElementComponent/>
                        <OrderElementComponent/>
                        <OrderElementComponent/>
                        <OrderElementComponent/>

                    </div>
                    <div className={styles.confirm}>
                        <div className={styles.fullPrice}>10000 ₽</div>
                        <button className={styles.button_next} onClick={e => setIsFirst(false)}>{"Confirm >"}</button>
                    </div>

                </div>
                :
                (<div className={styles.secondSlide}>
                    <div className={styles.restaurant}>
                        <div className={styles.rest_img}><img src="http://localhost:8000/images/restaurants/Rest8.jpg" alt=""/></div>
                        <div className={styles.rest_info}>
                            <div className={styles.rest_name}>KFC</div>
                            <div className={styles.rest_location}>Moscow patriarchie prydi d. 12</div>
                        </div>
                    </div>
                    <div className={styles.payment}>
                        <span>pay by card</span>
                        <div className={styles.payment_container}>
                            <label className={styles.switch} htmlFor="checkbox">
                                <input className={styles.checkbox} id="checkbox" type="checkbox" />
                                <div className={[styles.slider, styles.round].join(" ")}></div>
                            </label>
                        </div>

                    </div>
                    <div className={styles.locationPicker}>
                        <span>location</span>
                        <label htmlFor="location" className={styles.location}>
                            <input list="browsers"  name="location" />
                            <datalist id="browsers">
                                <option value="home">Home</option>
                                <option value="Work">Work</option>
                            </datalist>
                            <div className={styles.arrow}>
                                <span></span>
                                <span></span>
                            </div>
                        </label>
                    </div>
                    <div className={styles.full_price}>10000 ₽</div>
                    <div className={styles.buttons}>
                        <button className={styles.button_next} onClick={e => setIsFirst(true)}>{"< Prev"}</button>
                        <button className={styles.button_next}>{"Submit >"}</button>
                    </div>
                </div>)
                }
            </div>
        </div>)
            :(
        <div className={styles.container}>
            <button onClick = {e => setIsOpen(true)} className={styles.buttonModal}>
                <h2 className={styles.caption}>Cart</h2>
            </button>
        </div>)

    );
}

export default OrderModalComponent;
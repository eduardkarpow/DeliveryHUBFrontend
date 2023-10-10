import React, {useEffect, useState} from 'react';
import styles from "../styles/orderModal.module.css";
import OrderElementComponent from "./OrderElementComponent";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {setPrice} from "../store/actions/OrdersAction";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";

function OrderModalComponent() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [exists, setExists] = useState<boolean>(false);
    const [isFirst, setIsFirst] = useState<boolean>(true);

    const {name, location, restaurant_image_href} = useAppSelector(store => store.RestaurantItem.restaurant);
    const menu = useAppSelector(store => store.RestaurantItem.menu);
    const fullPrice = useAppSelector(store => store.Orders.fullPrice);
    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();

    useEffect(() => {
        dispatch(setPrice(menu));
    }, [menu])

    useEffect(() => {
        setExists(fullPrice > 0);
    },[fullPrice])

    return (
        exists?
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
                        <div className={styles.rest_img}><img src={`http://localhost:8000/${restaurant_image_href}`} alt=""/></div>
                        <div className={styles.rest_info}>
                            <div className={styles.rest_name}>{name}</div>
                            <div className={styles.rest_location}>{location}</div>
                        </div>
                    </div>
                    <div className={styles.order_elements}>
                        {
                            menu.map((el, index) => el.amount ? <OrderElementComponent id={index} price={el.price}
                                                                                                     name={el.name} image_href={el.image_href}
                                                                                                     key={el.id}/> : null)
                        }

                    </div>
                    <div className={styles.confirm}>
                        <div className={styles.fullPrice}>{fullPrice} ₽</div>
                        <button className={styles.button_next} onClick={e => setIsFirst(false)}>{"Confirm >"}</button>
                    </div>

                </div>
                :
                (<div className={styles.secondSlide}>
                    <div className={styles.restaurant}>
                        <div className={styles.rest_img}><img src={`http://localhost:8000/${restaurant_image_href}`} alt=""/></div>
                        <div className={styles.rest_info}>
                            <div className={styles.rest_name}>{name}</div>
                            <div className={styles.rest_location}>{location}</div>
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
    :<div></div>
    );
}

export default OrderModalComponent;
import React, {useEffect, useState} from 'react';
import styles from "../styles/orderModal.module.css";
import OrderElementComponent from "./OrderElementComponent";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {makeOrder, setPrice} from "../store/actions/OrdersAction";
import {ThunkDispatch} from "redux-thunk";
import {history, RootState} from "../store";
import {getAllLocations} from "../store/actions/AccountAction";
import {checkAuth} from "../store/actions/AuthAction";
import {ErrorHandlerHook} from "../hooks/ErrorHandler";
import {clearMenuActionCreator} from "../store/RestaurantItemReducer";

function OrderModalComponent() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [exists, setExists] = useState<boolean>(false);
    const [isFirst, setIsFirst] = useState<boolean>(true);
    const [curLocation, setCurLocation] = useState<string>("");
    const [payByCard, setPayByCard] = useState<boolean>(false);

    const {name, location, restaurant_image_href, id_restaurants} = useAppSelector(store => store.RestaurantItem.restaurant);
    const menu = useAppSelector(store => store.RestaurantItem.menu);
    const fullPrice = useAppSelector(store => store.Orders.fullPrice);
    const login = useAppSelector(store => store.Auth.login);
    const locations = useAppSelector(store => store.Account.locations);
    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();

    useEffect(() => {
        try{
            if(localStorage.getItem("token")){
                //dispatch(checkAuth());
            } else{
                //history.push("/login");

            }
        } catch(e:any){
            ErrorHandlerHook(e);
        }
        dispatch(getAllLocations(login))
    },[login]);
    useEffect(() => {
        dispatch(setPrice(menu));
    }, [menu])

    useEffect(() => {
        setExists(fullPrice > 0);
    },[fullPrice])

    const make_order = (e:any) => {
        e.preventDefault();
        if(!curLocation){
            ErrorHandlerHook(new Error("Пожалуйста введите адрес"));
            return;
        }
        console.log(payByCard);
        dispatch(makeOrder(menu, id_restaurants, fullPrice, payByCard, login, curLocation));
        setExists(false);
        setIsOpen(false);
        dispatch(clearMenuActionCreator());
        setTimeout(() => {window.location.reload()},1000);
    }

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
                        <button className={styles.button_next} onClick={e => setIsFirst(false)}>{"Далее >"}</button>
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
                        <span>Оплата по карте</span>
                        <div className={styles.payment_container}>
                            <label className={styles.switch} htmlFor="checkbox">
                                <input className={styles.checkbox} id="checkbox" type="checkbox" onChange={e =>
                                {
                                    setPayByCard(!payByCard)
                                    console.log(payByCard)
                                    return;
                                }
                                }/>
                                <div className={[styles.slider, styles.round].join(" ")}></div>
                            </label>
                        </div>

                    </div>
                    <div className={styles.locationPicker}>
                        <span>адрес</span>
                        <label htmlFor="location" className={styles.location}>
                            <input list="browsers"  name="location" value={curLocation} onChange={e => setCurLocation(e.target.value)}/>
                            <datalist id="browsers">
                                {locations.map(el =>
                                    <option value={el.location} key={el.locationName}>{el.locationName}</option>)
                                }

                            </datalist>
                            <div className={styles.arrow}>
                                <span></span>
                                <span></span>
                            </div>
                        </label>
                    </div>
                    <div className={styles.full_price}>{fullPrice} ₽</div>
                    <div className={styles.buttons}>
                        <button className={styles.button_next} onClick={e => setIsFirst(true)}>{"< Назад"}</button>
                        <button className={styles.button_next} onClick={make_order}>{"Далее >"}</button>
                    </div>
                </div>)
                }
            </div>
        </div>)
            :(
        <div className={styles.container}>
            <button onClick = {e => setIsOpen(true)} className={styles.buttonModal}>
                <h2 className={styles.caption}>Корзина</h2>
            </button>
        </div>)
    :<div></div>
    );
}

export default OrderModalComponent;
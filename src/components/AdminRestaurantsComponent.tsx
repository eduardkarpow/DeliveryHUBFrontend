import React, {useEffect, useRef, useState} from 'react';
import {register, uploadImage} from "../store/actions/AuthAction";
import {loadingActionCreator} from "../store/AuthReducer";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {AddRestaurant, GetRestaurants, UpdateRestaurant} from "../store/actions/AdminAction";
import {ErrorHandlerHook} from "../hooks/ErrorHandler";
import styles from "../styles/admin.module.css";
import {NavLink} from "react-router-dom";

const AdminRestaurantsComponent = () => {

    const filePicker = useRef(null);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRating, setPriceRating] = useState(0);
    const [selected, setSelected] = useState<File>();

    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();
    const rests = useAppSelector(state => state.AdminRestaurants.restaurants);

    useEffect(() => {
        dispatch(GetRestaurants());
    }, [])

    const addRestaurant = (event:any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        if(!selected){
            ErrorHandlerHook(new Error("Фото не выбрано"));
        } else{
            formData.append("isUploaded", "true");
            // @ts-ignore
            formData.append("image", filePicker.current.files[0]);
            dispatch(AddRestaurant(name, location, priceRating, formData));
        }
    }
    const updateRestaurant = (restId:number) => {
        return (event:any) => {
            event.preventDefault();
            dispatch(UpdateRestaurant(rests, restId));
        }
    }

    return (
        <section className={styles.wrapper}>
            <form acceptCharset={"utf-8"} className={styles.form}>
                <label htmlFor="name">Название ресторана</label>
                <input type="text" id="name"
                       placeholder="Введите название ресторана"
                       value={name}
                       onChange={e => setName(e.target.value)} />
                <label htmlFor="location">Расположение</label>
                <input type="text" id="location"
                       placeholder="Введите расположение ресторана"
                       value={location}
                       onChange={e => setLocation(e.target.value)} />
                <label htmlFor="priceRating">Рейтинг цен</label>
                <input type="number" id="priceRating"
                       value={priceRating}
                       onChange={e => setPriceRating(Number(e.target.value))} />
                <input type="file" accept="image/*" ref={filePicker} onChange={e => {
                    if(e.target.files) {
                        setSelected(e.target.files[0]);
                    }
                }}/>
                <button onClick = {addRestaurant}>Добавить</button>
            </form>
            <div>
                <div className={styles.buttons}>
                    <NavLink to={"/admin/restaurants"}>админка ресторанов</NavLink>
                    <NavLink to={"/admin/orders"}>админка заказов</NavLink>
                </div>
                {rests.map(el =>
                    <NavLink to={`/admin/food/${el.id}`} className={styles.restaurant_item}>
                    <div className={styles.image}><img src={`http://localhost:8000/${el.image}`} alt=""/></div>
                    <div className={styles.info}>
                        <div className={styles.caption}>{el.name}</div>
                        <div className={styles.id}>id: {el.id}</div>
                    </div>
                        {el.restVisible ? <button className={styles.closeButton} onClick={updateRestaurant(el.id)}>Удалить</button> : null}
                    </NavLink>
                )}

            </div>
        </section>
    );
};

export default AdminRestaurantsComponent;
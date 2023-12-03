import React, {useEffect, useState} from 'react';
import styles from "../styles/restaurants.module.css";
import RestaurantItemComponent from "./RestaurantItemComponent";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {RootState} from "../store";
import {getAllRestaurants, getAllSpecializations} from "../store/actions/RestaurantsAction";
import {ThunkDispatch} from "redux-thunk";
const RestaurantsComponent = () => {

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const restaurants = useAppSelector(store => store.Restaurants.restaurants);
    const specs = useAppSelector(store => store.Restaurants.specializations);
    const [priceRating, setPriceRating] = useState<number>(0);
    const [specialization, setSpecialization] = useState<string>("");
    const [searchField, setSearchField] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        dispatch(getAllRestaurants());
        dispatch(getAllSpecializations());
    },[])

    const addClass = (e:any) => {
        Array.from(document.querySelectorAll("."+styles.categories+">span")).map(spa => spa.classList.remove(styles.active));
        e.target.classList.add(styles.active);
        setSpecialization(e.target.innerText);
    }
    const addPrice = (e:any) => {
        Array.from(document.querySelectorAll("."+styles.prices+">span")).map(spa => spa.classList.remove(styles.active));
        e.target.classList.add(styles.active);
        setPriceRating(Number(e.target.id));
    }
    const clear = (e:any) => {
        e.preventDefault();
        Array.from(document.querySelectorAll("."+styles.prices+">span")).map(spa => spa.classList.remove(styles.active));
        Array.from(document.querySelectorAll("."+styles.categories+">span")).map(spa => spa.classList.remove(styles.active));
        setPriceRating(0);
        setSpecialization("");
    }
    const searching = (e:any) => {
        e.preventDefault();
        setSearch(searchField);
        setSearchField("");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.categories}>
                {specs.map((spec, index) => <span onClick={addClass} key = {spec.food_specialization}>{spec.food_specialization}</span>)}
            </div>
            <div className={styles.prices}>
                <span onClick={addPrice} id="1">$</span><span onClick={addPrice} id="2">$$</span><span onClick={addPrice} id="3">$$$</span> <span className={styles.clear} onClick={clear}>Очистить</span>
            </div>
            <div className={styles.search}>
                <input className = {styles.search_input}
                       type="text" placeholder="Поиск ресторанов"
                       value={searchField} onChange={e => setSearchField(e.target.value)}/>
                <button className = {styles.search_button} onClick={searching}>Поиск</button>
            </div>
            {/*<div className={styles.rating}>
                <span className={styles.active}>Выше 4</span><span>Выше 3</span><span>Выше 2</span>
            </div>*/}
            {restaurants.map((restaurant, index) => {
                if((!specialization || restaurant.specs.some(spec => spec === specialization)) && (!priceRating || restaurant.price_rating === priceRating) && restaurant.name.toLowerCase().includes(search.toLowerCase()) && restaurant.restVisible) {
                    return <NavLink to={"/restaurants/" + restaurant.id_restaurants}><RestaurantItemComponent
                        image_href={restaurant.restaurant_image_href}
                        name={restaurant.name} rating={restaurant.rating} priceRating={restaurant.price_rating}
                        location={restaurant.location} specs={restaurant.specs}
                        key={restaurant.id_restaurants}/></NavLink>

                }
                else{
                    return null
                }
                }
            )}

        </div>
    );
};

export default RestaurantsComponent;
import React, {useEffect, useState} from 'react';
import styles from "../styles/restaurantpage.module.css";
import RestaurantItemComponent from "./RestaurantItemComponent";
import MenuItemComponent from "./MenuItemComponent";
import ReviewItemComponent from "./ReviewItemComponent";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {RootState, store} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {getMenu, getRestaurant} from "../store/actions/RestaurantItemAction";
import {useParams} from "react-router-dom";
import {addReview, getAllReviews} from "../store/actions/ReviewsAction";
import {setPrice} from "../store/actions/OrdersAction";
import {removeSQLInjection} from "../hooks/removeSQLInjection";
const RestaurantPageComponent = () => {

    const params = useParams();

    useEffect(() => {
        dispatch(getRestaurant(Number(params.restid)));
        dispatch(getMenu(Number(params.restid)));
        dispatch(getAllReviews(Number(params.restid)));

    },[])

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const restaurant = useAppSelector(store => store.RestaurantItem.restaurant);
    const menu = useAppSelector(store => store.RestaurantItem.menu);
    const {login, avatarHref} = useAppSelector(store => store.Auth);
    const reviews = useAppSelector(store => store.Reviews.reviews);
    const isAuth = useAppSelector(store => store.Auth.isAuth);

    const add_review = (e:any) => {
        e.preventDefault();
        setText(removeSQLInjection(text));
        dispatch(addReview(text,grade, 0,Number(params.restid), login, avatarHref.slice(22), reviews.length ? reviews[reviews.length-1]["id_reviews"]+1 : 1));
        setText("");
        setGrade(0);
    }

    const [text, setText] = useState("");
    const [grade, setGrade] = useState(0);


    return (
        <div className={styles.wrapper}>
            {<RestaurantItemComponent image_href={restaurant.restaurant_image_href}
                                      name={restaurant.name} rating={restaurant.rating}
                                      priceRating={restaurant.price_rating} location={restaurant.location}
                                      specs={restaurant.specs}/>
            }
            <div className={styles.menu_title}>МЕНЮ</div>
            <div className={styles.menu}>
                {menu.map((el, index) =>
                    <MenuItemComponent restId={Number(params.restid)} id={el.id}
                                       image_href={el.image_href} name={el.name}
                                       price={el.price} index={index} key={el.id}/>
                )}
            </div>
            <div className={styles.menu_title}>ОТЗЫВЫ</div>
            <div className={styles.add_review}>
                <textarea name="review" value={text} onChange={e => setText(e.target.value)}></textarea>
                <input type="number" value={grade} onChange={e => {
                    if(Number(e.target.value) > 5){
                        setGrade(5)
                    } else{
                        setGrade(Number(e.target.value));
                    }
                return;}}/>
                {isAuth ? <button className={styles.review_button} onClick={add_review} >ОПУБЛИКОВАТЬ</button> : null}

            </div>
            <div className={styles.reviews}>
                {reviews.map((el, index) => <ReviewItemComponent key={el.id_reviews} {...el}/>)}
            </div>
        </div>
    );
};

export default RestaurantPageComponent;
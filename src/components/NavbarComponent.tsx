import React, {useEffect} from 'react';
import styles from "../styles/navbar.module.css";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {logout} from "../store/actions/AuthAction";
import img from "../images/avatar/Mark_Zuckerberg.jpg";
import {BASE_URL} from "../index";

const NavbarComponent = () => {

    const isAuth:boolean = useAppSelector(store => store.Auth.isAuth);
    const login:string = useAppSelector(store => store.Auth.login);
    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const avatar = useAppSelector(store => store.Auth.avatarHref);
    const isAdmin = useAppSelector(store => store.Auth.isAdmin);



    const Logout = (e:any) => {
        e.preventDefault();
        dispatch(logout(login));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>Delivery<span>HUB</span></div>
            <div className={styles.content}>
                <NavLink to="/restaurants">Рестораны</NavLink>
                <NavLink to="/orders">Заказы</NavLink>
                {isAdmin ? <NavLink to="/admin/restaurants">Админка</NavLink> : <div></div>}
            </div>
                {isAuth ?
                    <div className={styles.account}>
                        <NavLink to="/account" className={styles.avatar}>
                            <img src={BASE_URL+avatar.slice(21)} alt="123"/>
                        </NavLink>
                        <div>{login}</div>
                        <div>


                        </div>
                        
                        <NavLink className={styles.logout} onClick={Logout} to="/login">Выход</NavLink>
                    </div>
                    :
                    <div className={styles.auth}>
                        <NavLink to="/register">Регистрация</NavLink>
                        <NavLink to="/login">Вход</NavLink>
                    </div>

                }
        </div>
    );
};

export default NavbarComponent;
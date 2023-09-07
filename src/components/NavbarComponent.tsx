import React from 'react';
import styles from "../styles/navbar.module.css";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {logout} from "../store/actions/AuthAction";

const NavbarComponent = () => {

    const isAuth:boolean = useAppSelector(store => store.Auth.isAuth);
    const login:string = useAppSelector(store => store.Auth.login);
    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();

    const Logout = (e:any) => {
        e.preventDefault();
        dispatch(logout(login));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>Delivery<span>HUB</span></div>
            <div className={styles.content}>
                <NavLink to="/restaurants">Restaurants</NavLink>
                <NavLink to="/orders">Orders</NavLink>
            </div>
                {isAuth ?
                    <div className={styles.account}>
                        <div>{login}</div>
                        <NavLink className={styles.logout} onClick={Logout} to="/login">Logout</NavLink>
                    </div>
                    :
                    <div className={styles.auth}>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </div>

                }
        </div>
    );
};

export default NavbarComponent;
import React, {useEffect, useState} from 'react';
import styles from "../styles/register.module.css";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {register} from "../store/actions/AuthAction";
import {useNavigate} from "react-router-dom";
function RegisterComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();
    const isAuth = useAppSelector(store => store.Auth.isAuth);
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuth){
            navigate("/login");
        }

    }, [isAuth, navigate]);
    const registerUser = (event:any) => {
        event.preventDefault();
        dispatch(register(login, password, phone, firstName, lastName));
    }

    return (
        <div className={styles.wrapper}>
            <form>
                <label htmlFor="login">Login</label>
                <input type="text" id="login"
                       placeholder="type your login"
                       value={login}
                       onChange={e => setLogin(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       placeholder="type your password"
                       value={password}
                       onChange={e => setPassword(e.target.value)} />
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone"
                       placeholder="type your phone number"
                       value={phone}
                       onChange={e => setPhone(e.target.value)} />
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName"
                       placeholder="type your phone First Name"
                       value={firstName}
                       onChange={e => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName"
                       placeholder="type your Last Name"
                       value={lastName}
                       onChange={e => setLastName(e.target.value)} />
                <button onClick = {registerUser}>REGISTER</button>
            </form>
        </div>
    );
}

export default RegisterComponent;
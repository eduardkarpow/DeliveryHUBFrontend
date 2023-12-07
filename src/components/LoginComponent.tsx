import React, {useState} from 'react';
import styles from "../styles/register.module.css";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch} from "../hooks/ReduxHooks";
import {logIn} from "../store/actions/AuthAction";
import {removeSQLInjection} from "../hooks/removeSQLInjection";
function LoginComponent() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();

    const LogIn = (event:any) => {
        event.preventDefault();
        setLogin(removeSQLInjection(login));
        setPassword(removeSQLInjection(password));
        dispatch(logIn(login, password));
    }

    return (
        <div className={styles.wrapper}>
            <form>
                <label htmlFor="login">Логин</label>
                <input type="text" id="login"
                       placeholder="Введите логин"
                       value={login} onChange={e => setLogin(e.target.value)} />
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password"
                       placeholder="Введите пароль"
                       value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={LogIn}>ВХОД</button>
            </form>
        </div>
    );
}

export default LoginComponent;
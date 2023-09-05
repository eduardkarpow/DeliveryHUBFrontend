import React, {useState} from 'react';
import styles from "../styles/register.module.css";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch} from "../hooks/ReduxHooks";
import {logIn} from "../store/actions/AuthAction";
function LoginComponent() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();

    const LogIn = (event:any) => {
        event.preventDefault();
        dispatch(logIn(login, password));
    }

    return (
        <div className={styles.wrapper}>
            <form>
                <label htmlFor="login">Login</label>
                <input type="text" id="login"
                       placeholder="type your login"
                       value={login} onChange={e => setLogin(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       placeholder="type your password"
                       value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={LogIn}>LOGIN</button>
            </form>
        </div>
    );
}

export default LoginComponent;
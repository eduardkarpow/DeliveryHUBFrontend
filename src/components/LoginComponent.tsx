import React from 'react';
import styles from "../styles/register.module.css";
function LoginComponent() {
    return (
        <div className={styles.wrapper}>
            <form>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" placeholder="type your login"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="type your password"/>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
}

export default LoginComponent;
import React from 'react';
import styles from "../styles/register.module.css";
function RegisterComponent() {
    return (
        <div className={styles.wrapper}>
            <form>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" placeholder="type your login"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="type your password"/>
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" placeholder="type your phone number"/>
                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
}

export default RegisterComponent;
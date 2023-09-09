import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import styles from "../styles/register.module.css";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {register, uploadImage} from "../store/actions/AuthAction";
import {useNavigate} from "react-router-dom";
import {loadingActionCreator} from "../store/AuthReducer";
function RegisterComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selected, setSelected] = useState<File>();

    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();
    const isAuth = useAppSelector(store => store.Auth.isAuth);
    const navigate = useNavigate();

    const filePicker = useRef(null);

    useEffect(() => {
        if(isAuth){
            navigate("/login");
        }

    }, [isAuth, navigate]);
    const registerUser = async (event:any) => {
        event.preventDefault();
        dispatch(register(login, password, phone, firstName, lastName));
        const formData = new FormData();
        formData.append("login", login);
        if(!selected){
            formData.append("isUploaded", "false");
        } else{
            formData.append("isUploaded", "true");
            // @ts-ignore
            formData.append("image", filePicker.current.files[0]);
        }
        dispatch(loadingActionCreator(true));
        setTimeout(() => {
            dispatch(uploadImage(formData));
            dispatch(loadingActionCreator(false));
        }, 1000);

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
                <input type="file" accept="image/*" ref={filePicker} onChange={e => {
                    if(e.target.files) {
                        setSelected(e.target.files[0]);
                    }
                }}/>
                <button onClick = {registerUser}>REGISTER</button>
            </form>
        </div>
    );
}

export default RegisterComponent;
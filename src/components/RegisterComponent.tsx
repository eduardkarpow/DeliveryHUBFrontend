import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import styles from "../styles/register.module.css";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {register, uploadImage} from "../store/actions/AuthAction";
import {useNavigate} from "react-router-dom";
import {loadingActionCreator} from "../store/AuthReducer";
import {removeSQLInjection} from "../hooks/removeSQLInjection";
import {ErrorHandlerHook} from "../hooks/ErrorHandler";
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
        setLogin(removeSQLInjection(login));
        setPassword(removeSQLInjection(password));
        setPhone(removeSQLInjection(phone));
        setFirstName(removeSQLInjection(firstName));
        setLastName(removeSQLInjection(lastName));
        let regexp = new RegExp(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g);
        if(!regexp.test(phone)){
            ErrorHandlerHook(new Error("Некорректный номер телефона"));
            return;
        }
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
                <label htmlFor="login">Логин</label>
                <input type="text" id="login"
                       placeholder="Введите логин"
                       value={login}
                       onChange={e => setLogin(e.target.value)} />
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password"
                       placeholder="Введите пароль"
                       value={password}
                       onChange={e => setPassword(e.target.value)} />
                <label htmlFor="phone">Номер телефона</label>
                <input type="text" id="phone"
                       placeholder="Введите номер телефона"
                       value={phone}
                       onChange={e => setPhone(e.target.value)} />
                <label htmlFor="firstName">Имя</label>
                <input type="text" id="firstName"
                       placeholder="Введите имя"
                       value={firstName}
                       onChange={e => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Фамилия</label>
                <input type="text" id="lastName"
                       placeholder="Введите фамилию"
                       value={lastName}
                       onChange={e => setLastName(e.target.value)} />
                <input type="file" accept="image/*" ref={filePicker} onChange={e => {
                    if(e.target.files) {
                        setSelected(e.target.files[0]);
                    }
                }}/>
                <button onClick = {registerUser}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
            </form>
        </div>
    );
}

export default RegisterComponent;
import React, {useEffect, useRef, useState} from 'react';
import styles from "../styles/admin.module.css";
import {NavLink, useParams} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {AddExistingIngredient, AddFood, AddIngredient, GetIngredients} from "../store/actions/AdminAction";
import {ErrorHandlerHook} from "../hooks/ErrorHandler";

const AdminIngredientsComponent = () => {
    const filePicker = useRef(null);
    const [name, setName] = useState("");
    const [ingrId, setIngrId] = useState(0);
    const [selected, setSelected] = useState<File>();
    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(GetIngredients());
    }, [])

    const ingrs = useAppSelector(store => store.AdminIngredients.ingredients);

    const addExistingIngredient = (event:any) => {
        event.preventDefault();
        dispatch(AddExistingIngredient(Number(params.foodid), ingrId));
    }
    const addIngredient = (event:any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        if(!selected){
            ErrorHandlerHook(new Error("Фото не выбрано"));
        } else{
            formData.append("isUploaded", "true");
            // @ts-ignore
            formData.append("image", filePicker.current.files[0]);
            dispatch(AddIngredient(name, Number(params.foodid), formData));
        }
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.forms}>
                <form acceptCharset={"utf-8"} className={styles.form_small}>
                    <label htmlFor="name">id ингредиента</label>
                    <input type="text" id="name"
                           placeholder="Введите название ресторана"
                           value={ingrId}
                           onChange={e => setIngrId(Number(e.target.value))} />

                    <button onClick = {addExistingIngredient}>Добавить</button>
                </form>
                <form acceptCharset={"utf-8"} className={styles.form_small}>
                    <label htmlFor="name">Название ингредиента</label>
                    <input type="text" id="name"
                           placeholder="Введите название ресторана"
                           value={name}
                           onChange={e => setName(e.target.value)} />



                    <input type="file" accept="image/*" ref={filePicker} onChange={e => {
                        if(e.target.files) {
                            setSelected(e.target.files[0]);
                        }
                    }}/>
                    <button onClick = {addIngredient}>Добавить</button>
                </form>
            </div>

            <div>
                <div className={styles.buttons}>
                    <NavLink to={"/admin/restaurants"}>добавить ресторан</NavLink>
                    <NavLink to={"/admin/food"}>добавить меню</NavLink>
                    <NavLink to={"/admin/ingredients"}>добавить ингридиент</NavLink>
                </div>
                {ingrs.map(el =>
                    <NavLink to={`/admin/ingredients/${el.id}`} className={styles.restaurant_item}>
                        <div className={styles.image}><img src={`http://localhost:8000/${el.image}`} alt=""/></div>
                        <div className={styles.info}>
                            <div className={styles.caption}>{el.name}</div>
                            <div className={styles.id}>id: {el.id}</div>
                        </div>
                    </NavLink>
                )}

            </div>
        </section>
    );
};

export default AdminIngredientsComponent;
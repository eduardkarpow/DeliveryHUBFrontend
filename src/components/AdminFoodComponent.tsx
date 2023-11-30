import React, {useEffect, useRef, useState} from 'react';
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import styles from "../styles/admin.module.css";
import {NavLink, useParams} from "react-router-dom";
import {getFoodsActionCreator} from "../store/AdminFoodReducer";
import {AddFood, AddRestaurant, GetFoods} from "../store/actions/AdminAction";
import {ErrorHandlerHook} from "../hooks/ErrorHandler";

const AdminFoodComponent = () => {

    const filePicker = useRef(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [weight, setWeight] = useState(0.0);
    const [calories, setCalories] = useState(0);
    const [fats, setFats] = useState(0);
    const [proteins, setProteins] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [selected, setSelected] = useState<File>();

    const dispatch:ThunkDispatch<RootState, unknown,any> = useAppDispatch();
    const params = useParams();
    const foods = useAppSelector(state => state.AdminFood.foods);


    useEffect(() => {
        dispatch(GetFoods(Number(params.restid)));
    }, [])

    const addFood = (event:any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        if(!selected){
            ErrorHandlerHook(new Error("Фото не выбрано"));
        } else{
            formData.append("isUploaded", "true");
            // @ts-ignore
            formData.append("image", filePicker.current.files[0]);
            dispatch(AddFood(name, price, weight, calories, fats, proteins, carbohydrates, Number(params.restid), formData));
        }
    }

    return (
        <section className={styles.wrapper}>
            <form acceptCharset={"utf-8"}>
                <label htmlFor="name">Название блюда</label>
                <input type="text" id="name"
                       placeholder="Введите название ресторана"
                       value={name}
                       onChange={e => setName(e.target.value)} />
                <label htmlFor="price">Цена</label>
                <input type="text" id="price"
                       placeholder="Введите цену"
                       value={price}
                       onChange={e => setPrice(Number(e.target.value))} />
                <div className={styles.row}>
                    <div className={styles.row_item}>
                        <label htmlFor="weight">Вес</label>
                        <input type="text" id="weight"
                               value={weight}
                               onChange={e => setWeight(Number(e.target.value))} />
                    </div>
                    <div className={styles.row_item}>
                        <label htmlFor="calories">Калорийность</label>
                        <input type="text" id="calories"
                               value={calories}
                               onChange={e => setCalories(Number(e.target.value))} />
                    </div>

                </div>
                <div className={styles.row}>
                    <div className={styles.row_item}>
                        <label htmlFor="fats">Жиры</label>
                        <input type="text" id="fats"
                               value={fats}
                               onChange={e => setFats(Number(e.target.value))} />
                    </div>
                    <div className={styles.row_item}>
                        <label htmlFor="carbohydrates">Углеводы</label>
                        <input type="text" id="carbohydrates"
                               value={carbohydrates}
                               onChange={e => setCarbohydrates(Number(e.target.value))} />
                    </div>


                </div>
                        <label htmlFor="proteins">Белки</label>
                        <input type="text" id="proteins"
                               value={proteins}
                               onChange={e => setProteins(Number(e.target.value))} />




                <input type="file" accept="image/*" ref={filePicker} onChange={e => {
                    if(e.target.files) {
                        setSelected(e.target.files[0]);
                    }
                }}/>
                <button onClick = {addFood}>Добавить</button>
            </form>
            <div>
                <div className={styles.buttons}>
                    <NavLink to={"/admin/restaurants"}>добавить ресторан</NavLink>
                    <NavLink to={"/admin/food"}>добавить меню</NavLink>
                    <NavLink to={"/admin/ingredients"}>добавить ингридиент</NavLink>
                </div>
                {foods.map(el =>
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

export default AdminFoodComponent;
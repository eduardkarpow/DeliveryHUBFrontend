import React, {useEffect} from 'react';
import styles from "../styles/ingredients.module.css";
import {useParams} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {getIngredientsInfo} from "../store/actions/IngredientsAction";
import {BASE_URL} from "../index";
const IngredientsComponent = () => {

    const params = useParams();



    useEffect(() => {
        dispatch(getIngredientsInfo(Number(params.foodid)));
    }, [])

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const ingredientsInfo = useAppSelector(store => store.Ingredients);


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src={`${BASE_URL}/${ingredientsInfo.image}`} alt="burger" id={styles.food}/>
                <div>
                    <div className={styles.caption}>{ingredientsInfo.name}</div>
                    <div className={styles.calories}>
                        <div className={styles.calorie_item}>
                            <div>Calories</div>
                            <div>{ingredientsInfo.calories}</div>
                        </div>
                        <span className={styles.wall}></span>
                        <div className={styles.calorie_item}>
                            <div>Protein</div>
                            <div>{ingredientsInfo.proteins}g</div>
                        </div>
                        <span className={styles.wall}></span>
                        <div className={styles.calorie_item}>
                            <div>Fat</div>
                            <div>{ingredientsInfo.fats}g</div>
                        </div>
                        <span className={styles.wall}></span>
                        <div className={styles.calorie_item}>
                            <div>Carbohydrates</div>
                            <div>{ingredientsInfo.carbohydrates}g</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.ingredients}>INGREDIENTS</div>
            <div className={styles.objects}>
            {ingredientsInfo.ingredients.map(el =>

                    <div className={styles.ingredient_item}>
                        <img src={`${BASE_URL}/${el.image}`} alt="Bun"/>
                        <div className={styles.ingredient_caption}>{el.name}</div>
                    </div>

                )}
        </div>
        </div>
    );
};

export default IngredientsComponent;
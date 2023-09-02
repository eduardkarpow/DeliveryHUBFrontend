import React from 'react';
import styles from "../styles/ingredients.module.css";
const IngredientsComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src="https://media.istockphoto.com/id/1188412964/photo/hamburger-with-cheese-and-french-fries.jpg?b=1&s=612x612&w=0&k=20&c=_JT2iitrsfuPYOmYHO336VFWeximXvauz6tRG4-7OVI=" alt="burger" id={styles.food}/>
                <div>
                    <div className={styles.caption}>Burger</div>
                    <div className={styles.calories}>
                        <div className={styles.calorie_item}>
                            <div>Calories</div>
                            <div>123</div>
                        </div>
                        <span className={styles.wall}></span>
                        <div className={styles.calorie_item}>
                            <div>Protein</div>
                            <div>12g</div>
                        </div>
                        <span className={styles.wall}></span>
                        <div className={styles.calorie_item}>
                            <div>Fat</div>
                            <div>30g</div>
                        </div>
                        <span className={styles.wall}></span>
                        <div className={styles.calorie_item}>
                            <div>Carbohydrates</div>
                            <div>15g</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.ingredients}>INGREDIENTS</div>
            <div className={styles.objects}>
                <div className={styles.ingredient_item}>
                    <img src="https://media.istockphoto.com/id/184693060/photo/brioche-bread-bun-on-white-background.jpg?s=612x612&w=0&k=20&c=aGbazaDJBIw1QyBwE7ae0kwr8SyDBap9MAJ-QR0hDck=" alt="Bun"/>
                    <div className={styles.ingredient_caption}>Bun</div>
                </div>
            </div>
        </div>
    );
};

export default IngredientsComponent;
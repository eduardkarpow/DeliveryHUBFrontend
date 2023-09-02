import React, {useState} from 'react';
import styles from "../styles/restaurantpage.module.css";

const ReviewItemComponent = () => {
    const [rating, setRating] = useState(0)
    return (
        <div className={styles.review_item}>
            <div className={styles.review_image}><img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-circle_89831.png"/></div>
            <div className={styles.review_content}>
                <div className={styles.rating}>4/5</div>
                <div className={styles.comment}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</div>
                <div className={styles.rate}>
                    <div className={styles.arrow_down} onClick={() => setRating(rating-1)}></div>
                    <div className={styles.comment_rating + (rating<0 ? " " + styles.negative : "")}>{rating}</div>
                    <div className={styles.arrow_up} onClick={ () => setRating(rating+1)}></div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItemComponent;
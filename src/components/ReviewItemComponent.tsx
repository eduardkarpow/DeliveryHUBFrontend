import React, {useState} from 'react';
import styles from "../styles/restaurantpage.module.css";
import {ReviewProps} from "../models/ReviewsModel";

const ReviewItemComponent = (props:ReviewProps) => {
    const [rating, setRating] = useState(0)
    return (
        <div className={styles.review_item}>
            <div className={styles.review_image}><img src={"http://localhost:8000/"+props.avatar_href}/></div>
            <div className={styles.review_content}>
                <div className={styles.rating}>{props.grade}/5</div>
                <div className={styles.comment}>{props.text}</div>
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
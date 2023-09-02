import React from 'react';
import styles from "../styles/loading.module.css";

const LoadingComponent = () => {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.text}>DELIVERY<span></span><span>HUB</span></div>
            </div>
        </div>
    );
};

export default LoadingComponent;
import React from 'react';
import styles from "../styles/account.module.css";
import {useAppSelector} from "../hooks/ReduxHooks";

const AccountComponent = () => {

    const avatarHref = useAppSelector(store => store.Auth.avatarHref)
    const {firstName, lastName} = useAppSelector(store => store.Auth);

    return (
        <div className={styles.account}>
            <div className={styles.info}>
                <div className={styles.avatar_image}><img src={avatarHref} alt=""/></div>
                <div className={styles.avatar_name}>{firstName} {lastName}</div>
            </div>
            <div className={styles.location_block}>
                <div className={styles.locations}>
                    <div className={styles.location__item}>
                        <div className={styles.location__name}>Home</div>
                        <span></span>
                        <div className={styles.location__address}>Moscow tverskaya ploshad'</div>
                    </div>
                    <div className={styles.location__item}>
                        <div className={styles.location__name}>Home</div>
                        <span></span>
                        <div className={styles.location__address}>Moscow tverskaya ploshad'</div>
                    </div>
                    <div className={styles.location__item}>
                        <div className={styles.location__name}>Home</div>
                        <span></span>
                        <div className={styles.location__address}>Moscow tverskaya ploshad'</div>
                    </div>
                </div>
                <div className={styles.location_form}>
                    <input type="text" placeholder="name of location"/>
                    <input type="text" placeholder="address"/>
                    <button>ADD</button>
                </div>
            </div>

        </div>
    );
};

export default AccountComponent;
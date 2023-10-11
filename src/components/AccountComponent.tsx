import React, {useEffect, useState} from 'react';
import styles from "../styles/account.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/ReduxHooks";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import {addLocation, getAllLocations} from "../store/actions/AccountAction";

const AccountComponent = () => {

    useEffect(() => {
        dispatch(getAllLocations(login));
    }, []);

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();
    const avatarHref = useAppSelector(store => store.Auth.avatarHref)
    const {firstName, lastName, login} = useAppSelector(store => store.Auth);


    const locations = useAppSelector(store => store.Account.locations);

    const [locationName, setLocationName] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    const addRecord = (e:any) => {
        e.preventDefault();
        dispatch(addLocation(login, locationName, location));
    }

    return (
        <div className={styles.account}>
            <div className={styles.info}>
                <div className={styles.avatar_image}><img src={avatarHref} alt=""/></div>
                <div className={styles.avatar_name}>{firstName} {lastName}</div>
            </div>
            <div className={styles.location_block}>
                <div className={styles.locations}>
                    {locations.map(el =>
                        <div className={styles.location__item} key={el.location}>
                            <div className={styles.location__name}>{el.locationName}</div>
                            <span></span>
                            <div className={styles.location__address}>{el.location}</div>
                        </div>
                    )}
                </div>
                <div className={styles.location_form}>
                    <input type="text"
                           placeholder="name of location"
                           value={locationName}
                           onChange={(e) => setLocationName(e.target.value)}
                    />
                    <input type="text"
                           placeholder="address"
                           value={location}
                           onChange={(e) => setLocation(e.target.value)}
                    />
                    <button onClick={addRecord}>ADD</button>
                </div>
            </div>

        </div>
    );
};

export default AccountComponent;
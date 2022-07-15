import { useEffect, useState } from 'react';
import styles from '../styles/SetDevice.module.css';

import { fireBaseStartApp, setDevice } from './firebaseComponent';

export default function SetDeviceInput() {
    const handleDropdown = (e) => {
        e.preventDefault();
        localStorage.setItem('device', e.target.value);
        setDevice(e.target.value);
    };
    useEffect(() => {
        fireBaseStartApp();
        const deviceNumber = localStorage.getItem('device');
        const selectForm = document.getElementById('devices');
        selectForm.value = deviceNumber;
    }, []);
    return (
        <div className={styles.container}>
            <select name='devices' id='devices' onChange={handleDropdown}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
            </select>
        </div>
    );
}

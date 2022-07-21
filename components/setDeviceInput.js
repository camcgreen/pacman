import { useEffect, useState } from 'react';
import styles from '../styles/SetDevice.module.css';

import { fireBaseStartApp, setDevice } from './firebaseComponent';

export default function SetDeviceInput() {
    const [showDevice, setShowDevice] = useState(true);
    const handleDropdown = (e, setShowDevice) => {
        e.preventDefault();
        setShowDevice(false);
        localStorage.setItem('device', e.target.value);
        setDevice(e.target.value);
    };
    useEffect(() => {
        fireBaseStartApp();
        const deviceNumber = localStorage.getItem('device');
        if (deviceNumber) {
            setShowDevice(false);
        } else {
            setShowDevice(true);
        }
        const selectForm = document.getElementById('devices');
        selectForm.value = deviceNumber;
    }, []);
    return (
        <div
            className={styles.container}
            style={{ opacity: showDevice ? 1 : 0 }}
        >
            <select
                name='devices'
                id='devices'
                onChange={(e) => handleDropdown(e, setShowDevice)}
            >
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

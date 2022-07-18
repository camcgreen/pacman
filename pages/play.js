import { useEffect, useState } from 'react';
import Keyboard from '../components/keyboard';

export default function Play() {
    const [value, setValue] = useState('');
    function handleGetValue(val) {
        setValue(val);
        // console.log(val);
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 140,
            }}
        >
            <input
                type='email'
                id='keyboard-input'
                style={{ width: 750, height: 30 }}
                value={value}
                readOnly
            />
            <Keyboard getValue={handleGetValue} />
        </div>
    );
}

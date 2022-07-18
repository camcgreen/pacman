import { useEffect, useState } from 'react';
import styles from '../styles/Keyboard.module.css';

const keyLayout = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'backspace',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'caps',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'enter',
    // 'done',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    '@',
    '.',
    '?',
    'space',
];

function getKeyType(key) {
    switch (key) {
        case 'backspace':
            return `${styles.keyWide}`;
        case 'caps':
            return `${styles.keyWide} ${styles.keyActivatable}`;
        case 'enter':
            return `${styles.keyWide}`;
        case 'space':
            return `${styles.keyExtraWide}`;
        default:
            return '';
    }
}

function getKeyString(key) {
    switch (key) {
        case 'backspace':
            return '⌫';
        case 'caps':
            return '⇪';
        case 'enter':
            return `↩`;
        case 'space':
            return '␣';
        default:
            return key;
    }
}

let prevKey = null;

export default function Keyboard() {
    const [keySelected, setKeySelected] = useState(0);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // console.log(keyLayout[keySelected]);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [keySelected]);
    function handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                if (keySelected - 1 >= 0) setKeySelected(keySelected - 1);
                break;
            case 'ArrowRight':
                if (keySelected + 1 <= keyLayout.length - 1)
                    setKeySelected(keySelected + 1);
                break;
            case 'ArrowUp':
                if (keySelected === keyLayout.length - 1) {
                    // setKeySelected(37);
                    setKeySelected(prevKey);
                } else if (keySelected === 31) {
                    setKeySelected(20);
                } else if (keySelected === 10) {
                    setKeySelected(10);
                } else if (keySelected - 10 >= 0) {
                    setKeySelected(keySelected - 10);
                }
                break;
            case 'ArrowDown':
                if (keySelected === 0) {
                    setKeySelected(11);
                } else if (keySelected === 21) {
                    setKeySelected(32);
                } else if (keySelected + 10 <= keyLayout.length - 1) {
                    prevKey = keySelected;
                    setKeySelected(keySelected + 10);
                } else {
                    prevKey = keySelected;
                    setKeySelected(keyLayout.length - 1);
                }
                break;
        }
    }
    return (
        <div className={styles.keyboard}>
            <div className={styles.keyContainer}>
                {keyLayout.map((key, i) => {
                    const insertLineBreak =
                        ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;
                    return (
                        <>
                            <button
                                className={`${styles.key} ${getKeyType(key)}`}
                                style={{
                                    border:
                                        i === keySelected && 'solid white 1px',
                                }}
                                // style={{ marginRight: insertLineBreak && 10 }}
                            >
                                {/* {key} */}
                                {getKeyString(key)}
                            </button>
                            <br
                                style={{
                                    display: insertLineBreak ? 'block' : 'none',
                                }}
                            />
                        </>
                    );
                })}
            </div>
        </div>
    );
}

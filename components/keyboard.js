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

export default function Keyboard() {
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

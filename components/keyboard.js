import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
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
    // 'caps',
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
    // 'space',
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
let allowJoystick = true;
let allowButtons = true;

export default function Keyboard({ getValue }) {
    const [keySelected, setKeySelected, keySelectedRef] = useState(0);
    const [input, setInput, inputRef] = useState('');

    function handleJoystickInput(keySelected) {
        const gamepads = navigator.getGamepads();
        const joystick = gamepads[0];
        if (joystick) {
            const left = joystick.axes[0] === -1;
            const right = joystick.axes[0] === 1;
            const up = joystick.axes[1] === -1;
            const down = joystick.axes[1] === 1;
            const buttonPressed =
                joystick.buttons[0].pressed ||
                joystick.buttons[1].pressed ||
                joystick.buttons[2].pressed ||
                joystick.buttons[3].pressed;

            if (
                !joystick.buttons[0].pressed &&
                !joystick.buttons[1].pressed &&
                !joystick.buttons[2].pressed &&
                !joystick.buttons[3].pressed
            ) {
                allowButtons = true;
            }

            if (!left && !right && !up && !down) {
                allowJoystick = true;
            }

            if (allowButtons) {
                if (buttonPressed) {
                    allowButtons = false;
                    let str = inputRef.current;
                    switch (keyLayout[keySelectedRef.current]) {
                        case 'backspace':
                            str = str.length > 1 ? str.slice(0, 1) : '';
                            break;
                        case 'enter':
                            // submit here
                            break;
                        default:
                            str += `${keyLayout[keySelectedRef.current]}`;
                            break;
                    }
                    setInput(str);
                }
            }

            if (allowJoystick) {
                if (left) {
                    allowJoystick = false;
                    if (keySelectedRef.current - 1 >= 0) {
                        setKeySelected((keySelected) => keySelected - 1);
                    }
                } else if (right) {
                    allowJoystick = false;
                    if (keySelectedRef.current + 1 <= keyLayout.length - 1) {
                        setKeySelected((keySelected) => keySelected + 1);
                    }
                } else if (up) {
                    allowJoystick = false;
                    // if (keySelectedRef.current === keyLayout.length - 1) {
                    //     // setKeySelected(37);
                    //     setKeySelected(prevKey);
                    // }
                    // else if (keySelectedRef.current === 31) {
                    //     setKeySelected(20);
                    // }
                    if (keySelectedRef.current === 10) {
                        setKeySelected(10);
                    } else if (keySelectedRef.current - 10 >= 0) {
                        setKeySelected((keySelected) => keySelected - 10);
                    }
                } else if (down) {
                    allowJoystick = false;
                    if (keySelectedRef.current === 0) {
                        setKeySelected(11);
                    }
                    // else if (keySelectedRef.current === 21) {
                    //     setKeySelected(32);
                    // }
                    else if (
                        keySelectedRef.current + 10 <=
                        keyLayout.length - 1
                    ) {
                        prevKey = keySelectedRef.current;
                        setKeySelected((keySelected) => keySelected + 10);
                    } else {
                        prevKey = keySelectedRef.current;
                        setKeySelected(keyLayout.length - 1);
                    }
                }
            }
            window.requestAnimationFrame(handleJoystickInput);
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleEnter);
        window.addEventListener('gamepadconnected', function (e) {
            window.requestAnimationFrame(handleJoystickInput);
        });
        return () => {
            window.removeEventListener('keydown', handleEnter);
            window.cancelAnimationFrame(handleJoystickInput);
            // window.cancelAnimationFrame(handleJoystickInput);
        };
    }, []);
    useEffect(() => {
        // window.addEventListener('gamepadconnected', function (e) {
        //     window.requestAnimationFrame(handleJoystickInput);
        // });
        // window.addEventListener('keydown', handleEnter);
        // window.addEventListener('keydown', handleKeyDown);
        // console.log(keyLayout[keySelected]);
        return () => {
            // window.removeEventListener('keydown', handleKeyDown);
            // window.removeEventListener('keydown', handleEnter);
            // window.cancelAnimationFrame(handleJoystickInput);
        };
    }, [keySelected]);
    useEffect(() => {
        // setTimeout(() => window.addEventListener('keydown', handleEnter), 1000);
        // window.addEventListener('keydown', handleEnter);
        // console.log(keyLayout[keySelected]);
        // console.log(input);
        getValue(input);
        return () => {
            // window.removeEventListener('keydown', handleEnter);
        };
    }, [input]);
    function handleKeyDown(e) {
        // setKeySelected(0);
        // setKeySelected(keySelected);
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
    function handleEnter(e) {
        if (e.key === 'Enter') {
            console.log('hey');
            let str = inputRef.current;
            console.log(str);
            switch (keyLayout[keySelectedRef.current]) {
                case 'backspace':
                    str = str.length > 0 && str.slice(0, 1);
                    break;
                // case 'caps':
                //  break
                case 'enter':
                    break;

                // case 'space':
                //     return '␣';
                default:
                    str += `${keyLayout[keySelectedRef.current]}`;
                    break;
            }

            // let str = input + `${keyLayout[keySelected]}`;
            // console.log(str);
            setInput(str);
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
                            >
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

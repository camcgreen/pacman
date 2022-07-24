import { useEffect, useRef } from 'react';
import { router } from 'next/router';
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
    '#',
    '$',
    '%',
    '&',
    '_',
    '-',
    '+',
    // 'space',
];

function getKeyType(key) {
    switch (key) {
        case 'backspace':
            return `${styles.keyWide}`;
        case 'caps':
            return `${styles.keyWide} ${styles.keyActivatable}`;
        case 'enter':
            return `${styles.keyWide} ${styles.enter}`;
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
let strings = ['', '', '', ''];
let string1 = '';
let string2 = '';
let string3 = '';
let string4 = '';
let check5 = false;
let check6 = false;
let check7 = false;

export default function Keyboard({
    getValue,
    hideKeyboard,
    selectedInput,
    getEnter,
}) {
    const [keySelected, setKeySelected, keySelectedRef] = useState(0);
    // const [input, setInput, inputRef] = useState('');
    const [input, setInput, inputRef] = useState([
        '',
        '',
        '',
        '',
        false,
        false,
    ]);
    const [hideKeyboardState, setHideKeyboardState, hideKeyboardStateRef] =
        useState(true);
    const [selectedInputState, setSelectedInputState, selectedInputStateRef] =
        useState(0);
    const [clicked, setClicked] = useState(false);
    const animationRef = useRef(0);

    // function handleJoystickMovement(keySelected) {
    //     const gamepads = navigator.getGamepads();
    //     const joystick = gamepads[0];
    //     if (joystick && router.pathname === '/over') {
    //         const left = joystick.axes[0] === -1;
    //         const right = joystick.axes[0] === 1;
    //         const up = joystick.axes[1] === -1;
    //         const down = joystick.axes[1] === 1;
    //         const buttonPressed =
    //             joystick.buttons[0].pressed ||
    //             joystick.buttons[1].pressed ||
    //             joystick.buttons[2].pressed ||
    //             joystick.buttons[3].pressed;

    //         if (
    //             !joystick.buttons[0].pressed &&
    //             !joystick.buttons[1].pressed &&
    //             !joystick.buttons[2].pressed &&
    //             !joystick.buttons[3].pressed
    //         ) {
    //             allowButtons = true;
    //         }

    //         if (!left && !right && !up && !down) {
    //             allowJoystick = true;
    //         }

    //         if (allowButtons) {
    //             if (buttonPressed) {
    //                 allowButtons = false;
    //                 // strings[selectedInputStateRef.current] = inputRef.current;
    //                 // let str = '';
    //                 switch (selectedInputStateRef.current) {
    //                     case 0:
    //                         string1 = inputRef.current[0];
    //                         break;
    //                     case 1:
    //                         string2 = inputRef.current[1];
    //                         break;
    //                     case 2:
    //                         string3 = inputRef.current[2];
    //                         break;
    //                     case 3:
    //                         string4 = inputRef.current[3];
    //                         break;
    //                     case 4:
    //                         check5 = !check5;
    //                         break;
    //                     case 5:
    //                         check6 = !check6;
    //                         break;
    //                     case 6:
    //                         check7 = !check7;
    //                         break;
    //                 }
    //                 if (!hideKeyboardStateRef.current) {
    //                     // if (!hideKeyboard) {
    //                     switch (keyLayout[keySelectedRef.current]) {
    //                         case 'backspace':
    //                             // str = str.length > 1 ? str.slice(0, -1) : '';
    //                             // strings[selectedInputStateRef.current] =
    //                             //     strings[selectedInputStateRef.current]
    //                             //         .length > 1
    //                             //         ? strings[
    //                             //               selectedInputStateRef.current
    //                             //           ].slice(0, -1)
    //                             //         : '';
    //                             // let stringToBackspace =
    //                             //     strings[selectedInputStateRef.current];
    //                             // setInput([stringToBackspace, ...strings]);

    //                             switch (selectedInputStateRef.current) {
    //                                 case 0:
    //                                     let newString1 = string1
    //                                         .toString()
    //                                         .replace(/,/g, '');
    //                                     newString1 = newString1.slice(0, -1);
    //                                     string1 = newString1;
    //                                     break;
    //                                 case 1:
    //                                     let newString2 = string2
    //                                         .toString()
    //                                         .replace(/,/g, '');
    //                                     newString2 = newString2.slice(0, -1);
    //                                     string2 = newString2;
    //                                     break;
    //                                 case 2:
    //                                     let newString3 = string3
    //                                         .toString()
    //                                         .replace(/,/g, '');
    //                                     newString3 = newString3.slice(0, -1);
    //                                     string3 = newString3;
    //                                     break;
    //                                 case 3:
    //                                     let newString4 = string4
    //                                         .toString()
    //                                         .replace(/,/g, '');
    //                                     newString4 = newString4.slice(0, -1);
    //                                     string4 = newString4;
    //                                     break;
    //                             }

    //                             break;
    //                         case 'enter':
    //                             // submit here
    //                             // sethideKeyboardState(true);
    //                             getEnter();
    //                             break;
    //                         default:
    //                             // str += `${keyLayout[keySelectedRef.current]}`;
    //                             switch (selectedInputStateRef.current) {
    //                                 case 0:
    //                                     string1 += `${
    //                                         keyLayout[keySelectedRef.current]
    //                                     }`;
    //                                     string1 = string1.replace(/,/g, '');
    //                                     if (string1.length > 1) {
    //                                         string1 = string1.slice(0, 1);
    //                                     }
    //                                     break;
    //                                 case 1:
    //                                     string2 += `${
    //                                         keyLayout[keySelectedRef.current]
    //                                     }`;
    //                                     string2 = string2.replace(/,/g, '');
    //                                     if (string2.length > 1) {
    //                                         string2 = string2.slice(0, 1);
    //                                     }
    //                                     break;
    //                                 case 2:
    //                                     string3 += `${
    //                                         keyLayout[keySelectedRef.current]
    //                                     }`;
    //                                     string3 = string3.replace(/,/g, '');
    //                                     if (string3.length > 1) {
    //                                         string3 = string3.slice(0, 1);
    //                                     }
    //                                     break;
    //                                 case 3:
    //                                     string4 += `${
    //                                         keyLayout[keySelectedRef.current]
    //                                     }`;
    //                                     string4 = string4.replace(/,/g, '');
    //                                     break;
    //                             }

    //                             // console.log(
    //                             //     `currently ${
    //                             //         strings[selectedInputStateRef.current]
    //                             //     }`
    //                             // );
    //                             // console.log(
    //                             //     `adding ${
    //                             //         keyLayout[keySelectedRef.current]
    //                             //     }`
    //                             // );
    //                             // strings[selectedInputStateRef.current] += `${
    //                             //     keyLayout[keySelectedRef.current]
    //                             // }`;
    //                             // let newStr = strings[
    //                             //     selectedInputStateRef.current
    //                             // ].replace(/,/g, '');
    //                             // // console.log(newStr);
    //                             // strings[selectedInputStateRef.current] = newStr;
    //                             // // strings[selectedInputStateRef.current] =
    //                             // //     strings[selectedInputStateRef.current] +
    //                             // //     'a';
    //                             // // setInput([...strings]);
    //                             break;
    //                     }
    //                     // setInput([...strings]);
    //                     // setInput([
    //                     //     string1,
    //                     //     string2,
    //                     //     string3,
    //                     //     string4,
    //                     //     check5,
    //                     //     check6,
    //                     // ]);
    //                 }
    //                 setInput([
    //                     string1,
    //                     string2,
    //                     string3,
    //                     string4,
    //                     check5,
    //                     check6,
    //                     check7,
    //                 ]);
    //             }
    //         }

    //         if (allowJoystick) {
    //             if (left) {
    //                 allowJoystick = false;
    //                 if (keySelectedRef.current - 1 >= 0) {
    //                     setKeySelected((keySelected) => keySelected - 1);
    //                 }
    //             } else if (right) {
    //                 allowJoystick = false;
    //                 if (keySelectedRef.current + 1 <= keyLayout.length - 1) {
    //                     setKeySelected((keySelected) => keySelected + 1);
    //                 }
    //             } else if (up) {
    //                 allowJoystick = false;
    //                 // if (keySelectedRef.current === keyLayout.length - 1) {
    //                 //     // setKeySelected(37);
    //                 //     setKeySelected(prevKey);
    //                 // }
    //                 // else if (keySelectedRef.current === 31) {
    //                 //     setKeySelected(20);
    //                 // }
    //                 if (keySelectedRef.current === 10) {
    //                     setKeySelected(10);
    //                 } else if (keySelectedRef.current - 10 >= 0) {
    //                     setKeySelected((keySelected) => keySelected - 10);
    //                 }
    //             } else if (down) {
    //                 allowJoystick = false;
    //                 if (keySelectedRef.current === 0) {
    //                     setKeySelected(11);
    //                 }
    //                 // else if (keySelectedRef.current === 21) {
    //                 //     setKeySelected(32);
    //                 // }
    //                 else if (
    //                     keySelectedRef.current + 10 <=
    //                     keyLayout.length - 1
    //                 ) {
    //                     prevKey = keySelectedRef.current;
    //                     setKeySelected((keySelected) => keySelected + 10);
    //                 } else {
    //                     prevKey = keySelectedRef.current;
    //                     setKeySelected(keyLayout.length - 1);
    //                 }
    //             }
    //         }
    //     }
    //     // window.requestAnimationFrame(handleJoystickMovement);
    //     animationRef.current = window.requestAnimationFrame(
    //         handleJoystickMovement
    //     );
    // }
    function handleTouchInput() {
        console.log(keyLayout[keySelectedRef.current]);
        switch (selectedInputStateRef.current) {
            case 0:
                string1 = inputRef.current[0];
                break;
            case 1:
                string2 = inputRef.current[1];
                break;
            case 2:
                string3 = inputRef.current[2];
                break;
            case 3:
                string4 = inputRef.current[3];
                break;
            case 4:
                check5 = !check5;
                break;
            case 5:
                check6 = !check6;
                break;
            case 6:
                check7 = !check7;
                break;
        }

        if (!hideKeyboardStateRef.current) {
            switch (keyLayout[keySelectedRef.current]) {
                case 'backspace':
                    switch (selectedInputStateRef.current) {
                        case 0:
                            let newString1 = string1
                                .toString()
                                .replace(/,/g, '');
                            newString1 = newString1.slice(0, -1);
                            string1 = newString1;
                            break;
                        case 1:
                            let newString2 = string2
                                .toString()
                                .replace(/,/g, '');
                            newString2 = newString2.slice(0, -1);
                            string2 = newString2;
                            break;
                        case 2:
                            let newString3 = string3
                                .toString()
                                .replace(/,/g, '');
                            newString3 = newString3.slice(0, -1);
                            string3 = newString3;
                            break;
                        case 3:
                            let newString4 = string4
                                .toString()
                                .replace(/,/g, '');
                            newString4 = newString4.slice(0, -1);
                            string4 = newString4;
                            break;
                    }

                    break;
                case 'enter':
                    getEnter();
                    break;
                default:
                    switch (selectedInputStateRef.current) {
                        case 0:
                            string1 += `${keyLayout[keySelectedRef.current]}`;
                            // string1 = string1.replace(/,/g, '');
                            if (string1.length > 1) {
                                string1 = string1.slice(0, 1);
                            }
                            console.log(string1);
                            break;
                        case 1:
                            string2 += `${keyLayout[keySelectedRef.current]}`;
                            // string2 = string2.replace(/,/g, '');
                            if (string2.length > 1) {
                                string2 = string2.slice(0, 1);
                            }
                            break;
                        case 2:
                            string3 += `${keyLayout[keySelectedRef.current]}`;
                            // string3 = string3.replace(/,/g, '');
                            if (string3.length > 1) {
                                string3 = string3.slice(0, 1);
                            }
                            break;
                        case 3:
                            string4 += `${keyLayout[keySelectedRef.current]}`;
                            // string4 = string4.replace(/,/g, '');
                            break;
                    }
            }
        }
        setInput([string1, string2, string3, string4, check5, check6, check7]);
    }
    useEffect(() => {
        const formSubmitted = localStorage.getItem('formSubmitted');
        if (formSubmitted) {
            localStorage.setItem('formSubmitted', false);
            string1 = '';
            string2 = '';
            string3 = '';
            string4 = '';
            check5 = false;
            check6 = false;
            check7 = false;
            setInput([
                string1,
                string2,
                string3,
                string4,
                check5,
                check6,
                check7,
            ]);
        }
        window.addEventListener('keydown', handleEnter);
        // window.addEventListener('gamepadconnected', function (e) {
        // window.requestAnimationFrame(handleJoystickMovement);
        // animationRef.current = window.requestAnimationFrame(
        //     handleJoystickMovement
        // );

        // });
        return () => {
            window.removeEventListener('keydown', handleEnter);
            // window.cancelAnimationFrame(handleJoystickMovement);
            // window.cancelAnimationFrame(handleJoystickMovement);
            // window.cancelAnimationFrame(animationRef.current);
        };
    }, []);
    useEffect(() => {
        setHideKeyboardState(hideKeyboard);
        setKeySelected(0);
    }, [hideKeyboard]);
    useEffect(() => {
        setSelectedInputState(selectedInput);
    }, [selectedInput]);
    useEffect(() => {
        // window.addEventListener('gamepadconnected', function (e) {
        //     window.requestAnimationFrame(handleJoystickMovement);
        // });
        // window.addEventListener('keydown', handleEnter);
        // window.addEventListener('keydown', handleKeyDown);
        // console.log(keyLayout[keySelected]);
        return () => {
            // window.removeEventListener('keydown', handleKeyDown);
            // window.removeEventListener('keydown', handleEnter);
            // window.cancelAnimationFrame(handleJoystickMovement);
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
            let str = inputRef.current;
            switch (keyLayout[keySelectedRef.current]) {
                case 'backspace':
                    str = str.length > 0 && str.slice(0, -1);
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
            setInput(str);
        }
    }
    return (
        <div
            className={styles.keyboard}
            style={{ display: hideKeyboard ? 'none' : 'block' }}
            // key={hideKeyboard}
            // style={{ display: 'block' }}
        >
            <div className={styles.keyContainer}>
                {keyLayout.map((key, i) => {
                    const insertLineBreak =
                        ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;
                    return (
                        <>
                            <button
                                className={`${styles.key} ${getKeyType(key)}`}
                                style={{
                                    // border:
                                    //     i === keySelected && 'solid white 1px',
                                    // border:
                                    //     keyLayout[i] === 'enter' &&
                                    //     i === keySelected
                                    //         ? 'solid black 3px'
                                    //         : i === keySelected &&
                                    //           'solid white 1px',
                                    backgroundColor:
                                        i === keySelected && clicked && 'white',
                                    color:
                                        i === keySelected && clicked && 'black',
                                }}
                                onClick={() => {
                                    setKeySelected(i);
                                    handleTouchInput();
                                    setClicked(true);
                                    setTimeout(() => setClicked(false), 200);
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

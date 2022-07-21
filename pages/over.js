import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import Head from 'next/head';
import styles from '../styles/Over.module.css';
import { router } from 'next/router';
import {
    fireBaseStartApp,
    setDevice,
    addDataToLeaderboard,
} from '../components/firebaseComponent';
import Keyboard from '../components/keyboard';

const submitForm = (e, score) => {
    e.preventDefault();
    // console.log('submitting');
    const initials =
        `${e.target[0].value}${e.target[1].value}${e.target[2].value}`.toUpperCase();
    const email = e.target[3].value;
    const communications = e.target[4].checked;
    if (score) {
        addDataToLeaderboard(initials, score, email, communications);
        localStorage.setItem('initials', initials);
        localStorage.setItem('formSubmitted', true);
    }
    // localStorage.setItem('reloadTimes', 0);
    router.push('/score');
};

// const submitForm = (score) => {
//     const initials0 = document.getElementById('initial0').value.toUpperCase();
//     const initials1 = document.getElementById('initial1').value.toUpperCase();
//     const initials2 = document.getElementById('initial2').value.toUpperCase();
//     const initials = `${initials0}${initials1}${initials2}`;
//     const email = document.getElementById('email').value;
//     const communications = document.getElementById('comms').checked;
//     // handle input validation
//     // if (score) {
//     //     addDataToLeaderboard(initials, score, email, communications);
//     //     localStorage.setItem('initials', initials);
//     // }
//     // router.push('/score');
// };

let allowJoystick = true;
let allowButtons = true;

export default function Over() {
    // const [score, setScore] = useState(0);
    const [score, setScore, scoreRef] = useState(0);
    const [selectedInput, setSelectedInput, selectedInputRef] = useState(0);
    // const [allowInputChange, setAllowInputChange, allowInputChangeRef] =
    //     useState(true);
    const [hideKeyboard, setHideKeyboard, hideKeyboardRef] = useState(true);
    const [values, setValues] = useState('');
    const [enterPressed, setEnterPressed, enterPressedRef] = useState(false);
    const animationRef = useRef(0);
    function handleGetValue(values) {
        setValues(values);
    }
    function handleEnter() {
        setEnterPressed(true);
    }
    function handleJoystickSelection() {
        const gamepads = navigator.getGamepads();
        const joystick = gamepads[0];
        if (joystick && router.pathname === '/over') {
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
                    if (enterPressedRef.current) {
                        setHideKeyboard(true);
                        setEnterPressed(false);
                    } else {
                        if (selectedInputRef.current < 4) {
                            setHideKeyboard(false);
                        } else if (selectedInputRef.current === 7) {
                            // console.log('submit form');
                            // submitForm(scoreRef.current);
                            // const gameForm =
                            //     document.getElementById('game-form');
                            // gameForm.submit();
                            // gameForm.dispatchEvent(
                            //     new Event('submit', {
                            //         cancelable: true,
                            //         bubbles: true,
                            //     })
                            // );
                            const submitButton =
                                document.getElementById('submit-button');
                            submitButton.click();
                        }
                    }

                    // if (selectedInputRef.current < 4) {
                    //     // if (allowInputChangeRef.current) {
                    //     if (enterPressedRef.current) {
                    //         setEnterPressed(false);
                    //         setHideKeyboard(true);
                    //     } else {
                    //         if (hideKeyboardRef.current) {
                    //             setHideKeyboard(false);
                    //         }
                    //     }
                    // } else if (selectedInputRef.current === 6) {
                    //     // const gameForm = document.getElementById('game-form');
                    //     // gameForm.submit();
                    // }
                }
            }

            if (allowJoystick) {
                if (left) {
                    allowJoystick = false;
                    if (
                        selectedInputRef.current - 1 >= 0 &&
                        // allowInputChangeRef.current
                        hideKeyboardRef.current
                    ) {
                        setSelectedInput((selectedInput) => selectedInput - 1);
                    }
                } else if (right) {
                    allowJoystick = false;
                    if (
                        selectedInputRef.current + 1 <= 7 &&
                        // allowInputChangeRef.current
                        hideKeyboardRef.current
                    ) {
                        setSelectedInput((selectedInput) => selectedInput + 1);
                    }
                } else if (up) {
                    allowJoystick = false;
                    if (
                        selectedInputRef.current - 1 >= 0 &&
                        // allowInputChangeRef.current
                        hideKeyboardRef.current
                    ) {
                        setSelectedInput((selectedInput) => selectedInput - 1);
                    }
                } else if (down) {
                    allowJoystick = false;
                    if (
                        selectedInputRef.current + 1 <= 7 &&
                        // allowInputChangeRef.current
                        hideKeyboardRef.current
                    ) {
                        setSelectedInput((selectedInput) => selectedInput + 1);
                    }
                }
            }
        }
        // window.requestAnimationFrame(handleJoystickSelection);
        animationRef.current = window.requestAnimationFrame(
            handleJoystickSelection
        );
    }
    useEffect(() => {
        // let reloadTimes = localStorage.getItem('reloadTimes');
        // console.log(reloadTimes);
        // if (reloadTimes) {
        //     if (reloadTimes > 0) {
        //         // localStorage.setItem('reloadTimes', 0);
        //     } else {
        //         console.log('reloading once');
        //         reloadTimes++;
        //         localStorage.setItem('reloadTimes', reloadTimes);
        //         router.reload();
        //     }
        // }
        const deviceNumber = localStorage.getItem('device');
        const score = localStorage.getItem('score');
        fireBaseStartApp();
        setDevice(`Device${deviceNumber}`);
        setScore(score);
        // window.addEventListener('gamepadconnected', function (e) {
        // window.requestAnimationFrame(handleJoystickSelection);
        animationRef.current = window.requestAnimationFrame(
            handleJoystickSelection
        );
        // });
        return () => {
            // window.cancelAnimationFrame(handleJoystickSelection);
            window.cancelAnimationFrame(animationRef.current);
            localStorage.setItem('reloadTimes', 0);
        };
    }, []);
    return (
        <div className={styles.container}>
            <Head>
                <title>Samsung Arcade</title>
                <meta name='description' content='Samsung Arcade' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <img src='/bg.svg' className={styles.bg}></img>
            {/* <img src='/bg-icons.svg' className={styles.bgIcons}></img> */}
            <img src='/bg-icons-3.svg' className={styles.bgIcons}></img>
            <main>
                <img src='/over.png' className={styles.over} />
                <h2>SCORE</h2>
                {/* <p>{`hideKeyboard = ${hideKeyboard}`}</p> */}
                {/* <h2>13770</h2> */}
                <h2 className={styles.marginBelow}>{score}</h2>
                <form
                    onSubmit={(e) => submitForm(e, score)}
                    id='game-form'
                    className={styles.gameForm}
                >
                    <h2>
                        PLEASE ENTER YOUR INITIALS TO BE ADDED TO THE
                        LEADERBOARD
                    </h2>
                    <div className={`${styles.inputs} ${styles.marginBelow}`}>
                        <input
                            type='text'
                            id='initial0'
                            maxLength='1'
                            // readOnly
                            value={values && values[0]}
                            required
                            style={{
                                border:
                                    selectedInput === 0 && 'solid #E5007E 2px',
                            }}
                        />
                        <input
                            type='text'
                            id='initial1'
                            maxLength='1'
                            value={values && values[1]}
                            required
                            // readOnly
                            style={{
                                border:
                                    selectedInput === 1 && 'solid #E5007E 2px',
                            }}
                        />
                        <input
                            type='text'
                            id='initial2'
                            maxLength='1'
                            value={values && values[2]}
                            required
                            // readOnly
                            style={{
                                border:
                                    selectedInput === 2 && 'solid #E5007E 2px',
                            }}
                        />
                    </div>
                    <h2>PLEASE ENTER YOUR EMAIL</h2>
                    <input
                        type='email'
                        id='email'
                        className={styles.marginBelow}
                        value={values && values[3]}
                        required
                        // readOnly
                        style={{
                            border: selectedInput === 3 && 'solid #E5007E 2px',
                        }}
                    />
                    <br />
                    <div className={styles.checkboxes}>
                        <div
                            className={styles.checkboxColumn}
                            // style={{
                            //     border:
                            //         selectedInput === 4 && 'solid #E5007E 2px',
                            // }}
                        >
                            <input
                                type='checkbox'
                                id='comms'
                                name='comms'
                                checked={values && values[4]}
                                className={styles.checkbox}
                                style={{
                                    border:
                                        selectedInput === 4 &&
                                        'solid #E5007E 2px',
                                }}
                            />
                            <label htmlFor='comms'>
                                CHECK THE BOX TO OPT IN TO MARKETING FROM
                                PARTNER RETAIL SERVICES (PRS&)
                            </label>
                        </div>
                        <div
                            className={styles.checkboxColumn}
                            // style={{
                            //     border:
                            //         selectedInput === 5 && 'solid #E5007E 2px',
                            // }}
                        >
                            <input
                                type='checkbox'
                                id='age'
                                name='age'
                                className={styles.checkbox}
                                checked={values && values[5]}
                                required
                                style={{
                                    border:
                                        selectedInput === 5 &&
                                        'solid #E5007E 2px',
                                }}
                            />
                            <label htmlFor='age'>
                                BY CHECKING THE BOX, I CONFIRM I AM OVER 18 AND
                                ELIGIBLE TO ENTER THE COMPETITION TO WIN THE
                                <strong> GALAXY Z FLIP3</strong> PRIZE PACK*
                            </label>
                        </div>
                        <div
                            className={styles.checkboxColumn}
                            // style={{
                            //     border:
                            //         selectedInput === 6 && 'solid #E5007E 2px',
                            // }}
                        >
                            <input
                                type='checkbox'
                                id='privacy'
                                name='privacy'
                                className={styles.checkbox}
                                checked={values && values[6]}
                                required
                                style={{
                                    border:
                                        selectedInput === 6 &&
                                        'solid #E5007E 2px',
                                }}
                            />
                            <label htmlFor='privacy'>
                                BY CHECKING THE BOX, I AGREE TO PRS PRIVACY
                                POLICY
                            </label>
                        </div>
                    </div>
                    {/* <div
                        className={styles.checkboxRow}
                        style={{
                            border: selectedInput === 4 && 'solid #E5007E 2px',
                        }}
                    >
                        <label htmlFor='comms'>
                            CHECK THE BOX TO SIGN-UP FOR PRS/SES COMMUNICATIONS
                        </label>
                        <input
                            type='checkbox'
                            id='comms'
                            name='comms'
                            checked={values && values[4]}
                            className={styles.checkbox}
                        />
                    </div>
                    <div
                        className={styles.checkboxRow}
                        style={{
                            border: selectedInput === 5 && 'solid #E5007E 2px',
                        }}
                    >
                        <label htmlFor='privacy'>
                            BY CHECKING THE BOX, I AGREE TO PRS PRIVACY POLICY
                        </label>
                        <input
                            type='checkbox'
                            id='privacy'
                            name='privacy'
                            className={styles.checkbox}
                            checked={values && values[5]}
                            required
                        />
                    </div> */}
                    <br />
                    <input
                        className={`${styles.submit} ${styles.marginBelow}`}
                        type='submit'
                        value='SUBMIT'
                        id='submit-button'
                        style={{
                            border: selectedInput === 7 && 'solid #E5007E 2px',
                        }}
                    />
                </form>
                <h2>COLLECT YOUR TICKETS BELOW</h2>
                <img src='/downArrow.svg' className={styles.downArrow} alt='' />
                <div className={styles.conditions}>
                    <p>
                        Terms and Conditions apply. By playing the game and
                        entering the competition, you are agreeing to the Terms
                        and Conditions and consent to the use of your data in
                        accordance with our Privacy Policy. The Main Prize is
                        only available to be won by participants who are 18
                        years old or over and are UK residents. For full Terms
                        and Conditions and our Privacy Policy, scan the QR code:
                    </p>
                    {/* <img src='/qr.png' alt='' /> */}
                    <img src='/qr-2.svg' alt='' />
                </div>
            </main>
            <Keyboard
                getValue={handleGetValue}
                getEnter={handleEnter}
                selectedInput={selectedInput}
                hideKeyboard={hideKeyboard}
                // keyboardInactive={hideKeyboardRef.current}
            />
            <button
                className='progressButton'
                onClick={() => router.push('/score')}
            >
                Progress
            </button>
        </div>
    );
}

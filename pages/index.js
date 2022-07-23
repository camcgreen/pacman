import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { router } from 'next/router';
import Fullscreen from '../components/fullscreen';
import styles from '../styles/Home.module.css';
import SetDeviceInput from '../components/setDeviceInput';

let allowButtons = false;

export default function Home() {
    const animationRef = useRef(0);
    function handleJoystickInput() {
        const gamepads = navigator.getGamepads();
        const joystick = gamepads[0];
        // console.log(joystick);
        // console.log(joystick);
        // let allowButtons = false;

        if (joystick && router.pathname === '/') {
            if (
                !joystick.buttons[0].pressed &&
                !joystick.buttons[1].pressed &&
                !joystick.buttons[2].pressed &&
                !joystick.buttons[3].pressed
            ) {
                // console.log('allow');
                allowButtons = true;
            }
            const buttonPressed =
                // joystick.axes[0] !== 0 ||
                // joystick.axes[1] !== 0 ||
                joystick.buttons[0].pressed ||
                joystick.buttons[1].pressed ||
                joystick.buttons[2].pressed ||
                joystick.buttons[3].pressed;
            if (buttonPressed) {
                // console.log('pressed');
                if (allowButtons) {
                    allowButtons = false;
                    router.push('/game');
                }
            }
        }
        // window.requestAnimationFrame(handleJoystickInput);
        animationRef.current =
            window.requestAnimationFrame(handleJoystickInput);
    }
    useEffect(() => {
        const gamepads = navigator.getGamepads();
        const joystick = gamepads[0];
        if (joystick) {
            animationRef.current =
                window.requestAnimationFrame(handleJoystickInput);
        } else {
            window.addEventListener('gamepadconnected', function (e) {
                // window.requestAnimationFrame(handleJoystickInput);
                animationRef.current =
                    window.requestAnimationFrame(handleJoystickInput);
                router.push('/game');
            });
        }
        // window.addEventListener('gamepadconnected', function (e) {
        //     // window.requestAnimationFrame(handleJoystickInput);
        //     animationRef.current =
        //         window.requestAnimationFrame(handleJoystickInput);
        // });
        return () => {
            // console.log('unmounting');
            // window.cancelAnimationFrame(handleJoystickInput);
            window.cancelAnimationFrame(animationRef.current);
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
            <img src='/bg-icons-2.svg' className={styles.bgIcons}></img>
            <main>
                {/* <h3>WELCOME TO THE</h3>
                <img src='/samsung.png' className={styles.samsung} /> */}
                <img src='/arcade.png' className={styles.arcade} />
                <img src='/zflipchase.png' className={styles.zFlipChase} />
                {/* <img src='/play.png' className={styles.play} /> */}
                {/* <h3>MOVE JOYSTICK TO START PLAYING</h3> */}
                <ol className={styles.instructions}>
                    <li>
                        <div className={styles.instructionsNumber}>1</div>
                        <p>
                            Score as many points as you can by eating the dots
                            as you move through the maze.
                        </p>
                    </li>
                    <li>
                        <div className={styles.instructionsNumber}>2</div>
                        <p>
                            The flashing pink dots turn the Aliens pink – eat
                            them to earn bonus points.
                        </p>
                    </li>
                    <li>
                        <div className={styles.instructionsNumber}>3</div>
                        <p>
                            Avoid the blue Aliens or risk losing points if you
                            cross paths. The Samsung products will also earn you
                            bonus points.
                        </p>
                    </li>
                    <li>
                        <div className={styles.instructionsNumber}>4</div>
                        <p>Be quick – you only have 90 seconds!</p>
                    </li>
                    <li>
                        <div className={styles.instructionsNumber}>5</div>
                        <p>
                            Don’t forget to enter your details at the end by
                            touching the screen.
                        </p>
                    </li>
                </ol>
                <h3>PRESS ANY BUTTON TO START PLAYING</h3>
                {/* <p>
          PLAYERS MUST BE 18 YEARS OLD OR OVER TO BE ELIGIBLE TO WIN A SAMSUNG
          HANDSET
        </p> */}
            </main>
            <Fullscreen />
            <SetDeviceInput />
            {/* <button
                className='progressButton'
                onClick={() => router.push('/game')}
            >
                Progress
            </button> */}
        </div>
    );
}

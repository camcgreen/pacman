import { useEffect } from 'react';
import Head from 'next/head';
import { router } from 'next/router';
import Fullscreen from '../components/fullscreen';
import styles from '../styles/Home.module.css';
import SetDeviceInput from '../components/setDeviceInput';

function handleJoystickInput() {
    const gamepads = navigator.getGamepads();
    const joystick = gamepads[0];
    // console.log(joystick);
    if (joystick && router.pathname === '/') {
        const buttonPressed =
            // joystick.axes[0] !== 0 ||
            // joystick.axes[1] !== 0 ||
            joystick.buttons[0].pressed ||
            joystick.buttons[1].pressed ||
            joystick.buttons[2].pressed ||
            joystick.buttons[3].pressed;
        if (buttonPressed) {
            router.push('/game');
            // if (router.pathname === '/') router.push('/game');
        }
    }
    window.requestAnimationFrame(handleJoystickInput);
}

export default function Home() {
    useEffect(() => {
        // window.addEventListener('gamepadconnected', function (e) {
        window.requestAnimationFrame(handleJoystickInput);
        // });
        return () => {
            console.log('unmounting');
            window.cancelAnimationFrame(handleJoystickInput);
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
            <img src='/bg-icons.svg' className={styles.bgIcons}></img>
            <main>
                <h3>WELCOME TO THE</h3>
                <img src='/samsung.png' className={styles.samsung} />
                <img src='/arcade.png' className={styles.arcade} />
                <img src='/play.png' className={styles.play} />
                {/* <h3>MOVE JOYSTICK TO START PLAYING</h3> */}
                <h3>PRESS ANY BUTTON TO START PLAYING</h3>
                {/* <p>
          PLAYERS MUST BE 18 YEARS OLD OR OVER TO BE ELIGIBLE TO WIN A SAMSUNG
          HANDSET
        </p> */}
            </main>
            <Fullscreen />
            <SetDeviceInput />
            <button
                className='progressButton'
                onClick={() => router.push('/game')}
            >
                Progress
            </button>
        </div>
    );
}

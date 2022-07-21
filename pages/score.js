import { useEffect, useState, useRef } from 'react';
import router from 'next/router';
import {
    getDatabase,
    fireBaseStartApp,
    DeviceData,
    device,
    setDevice,
    addDataToLeaderboard,
    setNumberOfDevices,
    getMainLeaderboard,
    BuildLeaderboard,
    tableData,
} from '../components/firebaseComponent';
import Head from 'next/head';
import styles from '../styles/Score.module.css';

const scoreItems = [
    { user: 'AWC', email: '', score: '18355' },
    { user: 'PEB', email: '', score: '18000' },
    { user: 'SGO', email: '', score: '16900' },
    { user: 'OWE', email: '', score: '16335' },
    { user: 'JEM', email: '', score: '15875' },
    { user: 'PMC', email: '', score: '14000' },
    { user: 'MJD', email: '', score: '13770' },
    { user: 'LGD', email: '', score: '13500' },
    { user: 'LED', email: '', score: '13105' },
    { user: 'DBI', email: '', score: '12900' },
];

let allowButtons = false;

export default function Score() {
    const [scoreItems, setScoreItems] = useState(null);
    const [yourInfo, setYourInfo] = useState([]);
    const animationRef1 = useRef(0);
    function handleJoystickButton() {
        const gamepads = navigator.getGamepads();
        const joystick = gamepads[0];
        // console.log(joystick);
        if (joystick && router.pathname === '/score') {
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
                if (allowButtons) {
                    allowButtons = false;
                    router.push('/');
                }
                // if (router.pathname === '/') router.push('/game');
            }
        }
        // window.requestAnimationFrame(handleJoystickButton);
        animationRef1.current =
            window.requestAnimationFrame(handleJoystickButton);
    }
    useEffect(() => {
        // // setTimeout(() => BuildLeaderboard(), 2000);
        // fireBaseStartApp();
        // setDevice('Device5');
        // const fetchData = async () => {
        //   const data = await getMainLeaderboard();
        //   console.log(data);
        //   data = data.flatMap((n) => n.Leaderboard);
        //   data.sort((firstItem, secondItem) => secondItem.Score - firstItem.Score);
        //   if (data.length > 10) {
        //     let dataCopy = [];
        //     for (let i = 0; i < 10; i += 1) {
        //       dataCopy.push(data[i]);
        //     }
        //     // setTable(dataCopy);
        //     // console.log(dataCopy);
        //     setScoreItems(dataCopy);
        //   } else {
        //     // setTable(data);
        //     // console.log(data);
        //     setScoreItems(data);
        //   }
        // };
        // fetchData();
        // // console.log(tableData);
        const yourInitials = localStorage.getItem('initials');
        const yourScore = localStorage.getItem('score');
        setYourInfo([yourInitials, yourScore]);
        // console.log(yourInfo[0].split('')[0]);
        // window.requestAnimationFrame(handleJoystickButton);
        animationRef1.current =
            window.requestAnimationFrame(handleJoystickButton);
        return () => {
            // window.cancelAnimationFrame(handleJoystickButton);
            window.cancelAnimationFrame(animationRef1.current);
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
            <img src='/bg-icons-3.svg' className={styles.bgIcons}></img>
            <main>
                {
                    // CHANGE THIS TO LEADERBOARD NOT ARCADE
                }
                <img src='/zflipchase.png' className={styles.zFlipChase} />
                <img
                    src='/leaderboard.png'
                    className={styles.leaderboardIcon}
                />
                <div className={styles.grid}>
                    <div className={`${styles.score} ${styles.left}`}>
                        {/* <div className={styles.initials}>
                            <div>{yourInfo[0] && yourInfo[0].split('')[0]}</div>
                            <div>{yourInfo[0] && yourInfo[0].split('')[1]}</div>
                            <div>{yourInfo[0] && yourInfo[0].split('')[2]}</div>
                        </div> */}
                        <h2>YOUR SCORE</h2>
                        {/* <h1>13770</h1> */}
                        <h1>{yourInfo && yourInfo[1]}</h1>
                    </div>
                    <BuildLeaderboard type='leaderboard' />
                    {/* <ul className={styles.leaderboard}>
            {scoreItems &&
              scoreItems.map((scoreItem, i) => {
                return (
                  <li key={i + 1}>
                    <p>{`${i + 1}.`}</p>
                    <p>{scoreItem.Alias}</p>
                    <p>{scoreItem.Score}</p>
                  </li>
                );
              })}
          </ul> */}
                    <div className={`${styles.score} ${styles.right}`}>
                        <div className={styles.initials}>
                            {/* <div>{scoreItems && scoreItems[0].Alias.split('')[0]}</div>
              <div>{scoreItems && scoreItems[0].Alias.split('')[1]}</div>
              <div>{scoreItems && scoreItems[0].Alias.split('')[2]}</div> */}
                            {/* <BuildLeaderboard type='highInitials' /> */}
                        </div>
                        <h2>HIGH SCORE</h2>
                        {/* <h1>{scoreItems && scoreItems[0].score}</h1> */}
                        <BuildLeaderboard type='highScore' />
                    </div>
                </div>
            </main>
            {/* <button
                className='progressButton'
                onClick={() => router.push('/')}
                style={{
                    padding: '10px 20px',
                    background: 'white',
                    border: 'none',
                }}
            >
                Restart
            </button> */}
            <button className='progressButton' onClick={() => router.push('/')}>
                Progress
            </button>
        </div>
    );
}

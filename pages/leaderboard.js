import { useEffect, useState } from 'react';
import Fullscreen from '../components/fullscreen';
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
import styles from '../styles/Leaderboard.module.css';

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

export default function Leaderboard() {
    const [scoreItems, setScoreItems] = useState(null);
    const [yourInfo, setYourInfo] = useState([]);
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
    }, []);
    return (
        <div className={styles.container}>
            <Head>
                <title>Samsung Arcade</title>
                <meta name='description' content='Samsung Arcade' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {/* <img src='/bg.svg' className={styles.bg}></img> */}
            <img src='/bg-2.svg' className={styles.bg}></img>
            {/* <img src='/bg-icons.svg' className={styles.bgIcons}></img> */}
            <main>
                <img src='/zflipchase.png' className={styles.zFlipChase} />
                <img
                    src='/leaderboard.png'
                    className={styles.leaderboardIcon}
                />
                <p className={styles.explain}>
                    Top the leaderboard for your chance to win a{' '}
                    <span>
                        Galaxy Z Flip3 , Buds Pro and Z Flip3 Silicone Cover.
                        <sup>1</sup>
                    </span>
                </p>
                <div className={styles.grid}>
                    {/* <div className={`${styles.score} ${styles.left}`}>
                        <div className={styles.initials}>
                            <div>{yourInfo[0] && yourInfo[0].split('')[0]}</div>
                            <div>{yourInfo[0] && yourInfo[0].split('')[1]}</div>
                            <div>{yourInfo[0] && yourInfo[0].split('')[2]}</div>
                        </div>
                        <h2>YOUR SCORE</h2>
                        <h1>{yourInfo && yourInfo[1]}</h1>
                    </div> */}
                    <BuildLeaderboard type='leaderboard' screen='leaderboard' />
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
                    {/* <div className={`${styles.score} ${styles.right}`}>
                        <div className={styles.initials}>
                            <BuildLeaderboard type='highInitials' />
                        </div>
                        <h2>HIGH SCORE</h2>
                        <BuildLeaderboard type='highScore' />
                    </div> */}
                </div>
                <p className={styles.conditions}>
                    <sup>1</sup>Terms and Conditions apply. By playing the game
                    and entering the competition, you are agreeing to the Terms
                    and Conditions and consent to the use of your data in
                    accordance with our Privacy Policy. The Main Prize is only
                    available to be won by participants who are 18 years old or
                    over and are UK residents. For full Terms and Conditions and
                    our Privacy Policy, see in store.
                </p>
            </main>
            {/* <button className='progressButton' onClick={() => router.push('/')}>
                Progress
            </button> */}
            <Fullscreen />
        </div>
    );
}

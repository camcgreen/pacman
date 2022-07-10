import { useEffect, useState } from 'react';
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
} from '../Components/firebaseComponent';
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
      <img src='/bg.svg' className={styles.bg}></img>
      <img src='/bg-icons.svg' className={styles.bgIcons}></img>
      <main>
        {
          // CHANGE THIS TO LEADERBOARD NOT ARCADE
        }
        <img src='/leaderboard.png' className={styles.leaderboardIcon} />
        <div className={styles.grid}>
          <div className={`${styles.score} ${styles.left}`}>
            <div className={styles.initials}>
              {/* <div>M</div> */}
              <div>{yourInfo[0] && yourInfo[0].split('')[0]}</div>
              {/* <div>J</div> */}
              <div>{yourInfo[0] && yourInfo[0].split('')[1]}</div>
              {/* <div>D</div> */}
              <div>{yourInfo[0] && yourInfo[0].split('')[2]}</div>
            </div>
            <h2>YOUR SCORE</h2>
            {/* <h1>13770</h1> */}
            <h1>{yourInfo && yourInfo[1]}</h1>
          </div>
          <BuildLeaderboard />
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
              {/* <div>{scoreItems[0].user.split('')[0]}</div>
              <div>{scoreItems[0].user.split('')[1]}</div>
              <div>{scoreItems[0].user.split('')[2]}</div> */}
              <div>{scoreItems && scoreItems[0].Alias.split('')[0]}</div>
              <div>{scoreItems && scoreItems[0].Alias.split('')[1]}</div>
              <div>{scoreItems && scoreItems[0].Alias.split('')[2]}</div>
            </div>
            <h2>HIGH SCORE</h2>
            <h1>{scoreItems && scoreItems[0].score}</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

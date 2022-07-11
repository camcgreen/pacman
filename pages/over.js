import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Over.module.css';
import { router } from 'next/router';
import {
  fireBaseStartApp,
  setDevice,
  addDataToLeaderboard,
} from '../components/firebaseComponent';

const submitForm = (e, score) => {
  e.preventDefault();
  const initials =
    `${e.target[0].value}${e.target[1].value}${e.target[2].value}`.toUpperCase();
  const email = e.target[3].value;
  console.log(initials);
  console.log(email);
  console.log(score);
  if (score) {
    addDataToLeaderboard(initials, score, email);
    localStorage.setItem('initials', initials);
  }
  router.push('/');
};

export default function Over() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    fireBaseStartApp();
    // Set device number from admin popup dropdown
    // setDevice('Device5');
    const deviceNumber = localStorage.getItem('device');
    setDevice(`Device${deviceNumber}`);
    const score = localStorage.getItem('score');
    setScore(score);
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
        <img src='/over.png' className={styles.over} />
        <h3>SCORE</h3>
        {/* <h2>13770</h2> */}
        <h2 className={styles.marginBelow}>{score}</h2>
        <form onSubmit={(e) => submitForm(e, score)}>
          <h2>PLEASE ENTER YOUR INTITIALS</h2>
          <div className={`${styles.inputs} ${styles.marginBelow}`}>
            <input type='text' id='initial0' maxLength='1' />
            <input type='text' id='initial1' maxLength='1' />
            <input type='text' id='initial2' maxLength='1' />
          </div>
          <h2>PLEASE ENTER YOUR EMAIL</h2>
          <input type='email' id='email' className={styles.marginBelow} />
          <br />
          <div className={styles.checkboxRow}>
            <label for='comms'>
              CHECK THE BOX TO SIGN-UP FOR PRS/SES COMMUNICATIONS
            </label>
            <input
              type='checkbox'
              id='comms'
              name='comms'
              // value='Bike'
              className={styles.checkbox}
            />
          </div>
          {/* <br /> */}
          <div className={styles.checkboxRow}>
            <label for='privacy'>
              BY CHECKING THE BOX, I AGREE TO PRS PRIVACY POLICY
            </label>
            <input
              type='checkbox'
              id='privacy'
              name='privacy'
              // value='Bike'
              className={styles.checkbox}
              required
            />
          </div>
          <br />
          <input
            className={`${styles.submit} ${styles.marginBelow}`}
            type='submit'
            value='SUBMIT'
          />
        </form>
        <h2>COLLECT YOUR TOKENS BELOW</h2>
        <p>
          PLAYERS MUST BE 18 YEARS OLD OR OVER TO BE ELIGIBLE TO WIN A SAMSUNG
          HANDSET
        </p>
      </main>
      <button
        className='progressButton'
        onClick={() => router.push('/leaderboard')}
      >
        Progress
      </button>
    </div>
  );
}

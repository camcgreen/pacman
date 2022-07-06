import { useEffect } from 'react';
import Head from 'next/head';
import { router } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    // Update this to joystick controls once have a joystick to test with
    document.onkeydown = (e) => {
      router.push('/game');
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
        <h3>MOVE JOYSTICK TO START PLAYING</h3>
        {/* <p>
          PLAYERS MUST BE 18 YEARS OLD OR OVER TO BE ELIGIBLE TO WIN A SAMSUNG
          HANDSET
        </p> */}
      </main>
    </div>
  );
}

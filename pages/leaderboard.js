import Head from 'next/head';
import styles from '../styles/Leaderboard.module.css';

export default function Leaderboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Samsung Arcade</title>
        <meta name='description' content='Samsung Arcade' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Leaderboard screen</h1>
      </main>
    </div>
  );
}

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
              <div>M</div>
              <div>J</div>
              <div>D</div>
            </div>
            <h2>YOUR SCORE</h2>
            <h1>13770</h1>
          </div>
          <ul className={styles.leaderboard}>
            {scoreItems.map((scoreItem, i) => {
              return (
                <li key={i + 1}>
                  <p>{`${i + 1}.`}</p>
                  <p>{scoreItem.user}</p>
                  <p>{scoreItem.score}</p>
                </li>
              );
            })}
          </ul>
          <div className={`${styles.score} ${styles.right}`}>
            <div className={styles.initials}>
              <div>{scoreItems[0].user.split('')[0]}</div>
              <div>{scoreItems[0].user.split('')[1]}</div>
              <div>{scoreItems[0].user.split('')[2]}</div>
            </div>
            <h2>HIGH SCORE</h2>
            <h1>{scoreItems[0].score}</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

import Head from 'next/head';
import styles from '../styles/Over.module.css';

export default function Over() {
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
        <h2>13770</h2>
        <form>
          <h2>PLEASE ENTER YOUR INTITIALS</h2>
          <div className={styles.inputs}>
            <input type='text' />
            <input type='text' />
            <input type='text' />
          </div>
          <h2>PLEASE ENTER YOUR EMAIL</h2>
          <input type='text' />
          <br />
          <input className={styles.submit} type='submit' value='SUBMIT' />
        </form>
        <h2>COLLECT YOUR TOKENS BELOW</h2>
        <p>
          PLAYERS MUST BE 18 YEARS OLD OR OVER TO BE ELIGIBLE TO WIN A SAMSUNG
          HANDSET
        </p>
      </main>
    </div>
  );
}

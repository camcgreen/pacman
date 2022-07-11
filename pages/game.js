import Head from 'next/head';
import { useEffect, useState } from 'react';
import { router } from 'next/router';
import styles from '../styles/Game.module.css';
import TileMap from '../logic/TileMap';

let hiddenTimer = 90 * 1000;
let roundedScore = 0;

let loseTime = true;

export default function Game() {
  const [timer, setTimer] = useState(null);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  // const [countdownToStart, setCountdownToStart] = useState(5);
  useEffect(() => {
    const tileSize = 64;
    const velocity = 4;
    const canvas = document.getElementById('gameCanvas');
    canvas.style.width = `${window.innerWidth / 2}px`;
    const ctx = canvas.getContext('2d');
    const tileMap = new TileMap(tileSize);
    const pacman = tileMap.getPacman(velocity);
    const enemies = tileMap.getEnemies(velocity);
    let gameOver = false;
    let gameWin = false;
    const gameOverSound = new Audio('/sounds/gameOver.wav');
    const gameWinSound = new Audio('/sounds/gameWin.wav');
    let gameStarted = false;
    function gameLoop() {
      if (pacman.madeFirstMove && !gameStarted) {
        setTimer(90 * 1000);
        gameStarted = true;
      }
      pacman.handleJoystickMovement();
      // console.log(pacman.iconsEaten);
      const rawScore =
        (pacman.dotsEaten * 555 + pacman.iconsEaten * 55) *
        (hiddenTimer / 100000);
      roundedScore = Math.ceil(rawScore / 5) * 5;
      setScore(roundedScore);
      tileMap.draw(ctx);
      pacman.draw(ctx, pause(), enemies);
      enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
      if (isHit()) {
        const overlay = document.getElementById('overlay');
        if (loseTime) {
          loseTime = false;
          const timeToRemove = 5000;
          if (hiddenTimer - timeToRemove <= 0) {
            hiddenTimer = 0;
          } else {
            hiddenTimer -= timeToRemove;
          }
          if (overlay) {
            overlay.style.opacity = 0.2;
            setTimeout(() => (overlay.style.opacity = 0), 400);
          }
        }
        setTimeout(() => (loseTime = true), 2000);
      }
      checkGameOver();
      checkGameWin();
    }
    function checkGameWin() {
      if (!gameWin) {
        gameWin = enemies.length === 0;
        if (gameWin) {
          // gameWinSound.play();
          const finishOverlay = document.getElementById('finish-overlay');
          const winPopup = document.getElementById('win-popup');
          if (finishOverlay) finishOverlay.style.opacity = 0.8;
          if (winPopup) winPopup.style.opacity = 1;
          // setTimeout(() => winPopup)
          localStorage.setItem('score', roundedScore);
          clearInterval(gameInterval);
          setGameWon(true);
          // alert('You win!');
          // setTimeout(() => router.push('/over'), 1500);
          // console.log('win');
          // router.push('/over');
          // setTimeout(() => router.push('/over'), 5000);
          setTimeout(() => router.push('/over'), 2500);
        }
      }
    }
    function checkGameOver() {
      if (!gameOver) {
        gameOver = isGameOver();
        if (gameOver) {
          // gameOverSound.play();
          // alert('You lose.');
          const finishOverlay = document.getElementById('finish-overlay');
          const losePopup = document.getElementById('lose-popup');
          if (finishOverlay) finishOverlay.style.opacity = 0.8;
          if (losePopup) losePopup.style.opacity = 1;
          localStorage.setItem('score', null);
          // router.push('/');
          // setTimeout(() => router.push('/'), 4000);
          setTimeout(() => router.push('/'), 2500);
        }
      }
    }
    function isGameOver() {
      return hiddenTimer <= 0;
    }
    function isHit() {
      return enemies.some(
        (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
      );
    }
    function pause() {
      // return !pacman.madeFirstMove || gameOver || gameWin;
      return (
        !pacman.madeFirstMove || gameOver || gameWin
        // gameOver || gameWin || !gameStarted
      );
    }
    // function drawGameEnd() {
    //   if (gameOver || gameWin) {
    //     let text = ' You Win!';
    //     if (gameOver) {
    //       text = 'Game Over';
    //     }
    //     ctx.fillStyle = 'black';
    //     ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);
    //     ctx.font = '75px comic sans';
    //     const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    //     gradient.addColorStop('0', 'magenta');
    //     gradient.addColorStop('0.5', 'blue');
    //     gradient.addColorStop('1.0', 'red');
    //     ctx.fillStyle = gradient;
    //     ctx.fillText(text, 10, canvas.height / 2);
    //   }
    // }
    tileMap.setCanvasSize(canvas);
    const gameInterval = setInterval(gameLoop, 1000 / 75);
    // setTimeout(() => (pacman.madeFirstMove = true), 2000);
    // setTimeout(() => (gameStarted = true), 2000);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer && !gameWon) {
        // setTimer(timer - 10);
        if (hiddenTimer - 10 <= 0) {
          hiddenTimer = 0;
          setTimer(hiddenTimer);
        } else {
        }
        setTimer(hiddenTimer - 10);
        hiddenTimer -= 10;
      }
    }, 10);
    return () => clearInterval(interval);
  }, [timer]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCountdownToStart(countdownToStart - 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [countdownToStart]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Samsung Arcade</title>
        <meta name='description' content='Samsung Arcade' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <img src='/bg.svg' className={styles.bg}></img>
      <main>
        <div className={styles.time}>
          <h4>TIME REMAINING</h4>
          {/* <h1>47.07</h1> */}
          <h1>{timer ? timer / 1000 : '90.00'}</h1>
        </div>
        <canvas id='gameCanvas'></canvas>
        <div className={styles.score}>
          <h4>SCORE</h4>
          <h1>{score}</h1>
          <br />
          <br />
          <h4>HIGH SCORE</h4>
          <h1>18355</h1>
        </div>
      </main>
      <div className={styles.overlay} id='overlay'></div>
      <div className={styles.finishOverlay} id='finish-overlay'></div>
      <button className='progressButton' onClick={() => router.push('/over')}>
        Progress
      </button>
      {/* <div className={styles.countdownToStart}>{countdownToStart}</div> */}
      <div className={`${styles.popup} ${styles.winPopup}`} id='win-popup'>
        <h1>YOU WON</h1>
        <p>{`Score: ${score}`}</p>
      </div>
      <div className={`${styles.popup} ${styles.losePopup}`} id='lose-popup'>
        <h1>YOU LOST</h1>
      </div>
    </div>
  );
}

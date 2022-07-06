import Head from 'next/head';
import { useEffect, useState } from 'react';
import { router } from 'next/router';
import styles from '../styles/Game.module.css';
import TileMap from '../logic/TileMap';

export default function Game() {
  const [timer, setTimer] = useState(60 * 1000);
  useEffect(() => {
    const tileSize = 32;
    const velocity = 2;
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
    function gameLoop() {
      tileMap.draw(ctx);
      drawGameEnd();
      pacman.draw(ctx, pause(), enemies);
      enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
      checkGameOver();
      checkGameWin();
    }
    function checkGameWin() {
      if (!gameWin) {
        gameWin = tileMap.didWin();
        if (gameWin) {
          gameWinSound.play();
          setTimeout(() => router.push('/over'), 5000);
        }
      }
    }
    function checkGameOver() {
      if (!gameOver) {
        gameOver = isGameOver();
        if (gameOver) {
          gameOverSound.play();
          setTimeout(() => router.push('/'), 4000);
        }
      }
    }
    function isGameOver() {
      return enemies.some(
        (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
      );
    }
    function pause() {
      return !pacman.madeFirstMove || gameOver || gameWin;
    }
    function drawGameEnd() {
      if (gameOver || gameWin) {
        let text = ' You Win!';
        if (gameOver) {
          text = 'Game Over';
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);
        ctx.font = '75px comic sans';
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');
        ctx.fillStyle = gradient;
        ctx.fillText(text, 10, canvas.height / 2);
      }
    }
    function decrementTimer() {
      setTimer(timer - 1 * 1000);
    }
    tileMap.setCanvasSize(canvas);
    setInterval(gameLoop, 1000 / 75);
  }, []);
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
          <h1>47.07</h1>
          {/* <h1>{timer}</h1> */}
        </div>
        <canvas id='gameCanvas'></canvas>
        <div className={styles.score}>
          <h4>SCORE</h4>
          <h1>10000</h1>
          <br />
          <br />
          <h4>HIGH SCORE</h4>
          <h1>18350</h1>
        </div>
      </main>
    </div>
  );
}

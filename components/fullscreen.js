import React from 'react';
import styles from '../styles/Fullscreen.module.css';

const Fullscreen = () => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <button
      // className='fullscreen'
      className={styles.fullscreen}
      onClick={() => {
        toggleFullScreen();
      }}
    >
      <img src='/fullscreen.svg' alt='' />
    </button>
  );
};

export default Fullscreen;

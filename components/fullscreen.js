import React, { useState, useEffect } from 'react';
import styles from '../styles/Fullscreen.module.css';

const Fullscreen = () => {
    const [showIcon, setShowIcon] = useState(true);
    const toggleFullScreen = (setShowIcon) => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setShowIcon(false);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setShowIcon(true);
            }
        }
    };
    useEffect(() => {
        document.addEventListener(
            'fullscreenchange',
            () => {
                if (
                    !document.webkitIsFullScreen &&
                    !document.mozFullScreen &&
                    !document.msFullscreenElement
                ) {
                    console.log('exited');
                    setShowIcon(true);
                } else {
                    setShowIcon(false);
                }
            },
            false
        );
    }, []);
    return (
        <button
            // className='fullscreen'
            className={styles.fullscreen}
            onClick={() => {
                toggleFullScreen(setShowIcon);
            }}
            style={{ opacity: showIcon ? 1 : 0 }}
        >
            <img src='/fullscreen.svg' alt='' />
        </button>
    );
};

export default Fullscreen;

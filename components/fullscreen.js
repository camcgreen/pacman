import React, { useState, useEffect } from 'react';
import styles from '../styles/Fullscreen.module.css';

const Fullscreen = () => {
    const [showIcon, setShowIcon] = useState(true);
    const toggleFullScreen = (setShowIcon) => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            localStorage.setItem('isFullscreen', true);
            setShowIcon(false);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                localStorage.setItem('isFullscreen', false);
                setShowIcon(true);
            }
        }
    };
    useEffect(() => {
        const isFullscreenStored = localStorage.getItem('isFullscreen');
        if (isFullscreenStored !== null) {
            console.log(`isFullscreenStored: ${isFullscreenStored}`);
            if (isFullscreenStored === 'false') {
                setShowIcon(true);
                console.log('displaying icon');
                // } else if (isFullscreenStored === 'true') {
            } else {
                setShowIcon(false);
                console.log('not displaying icon');
            }
            // else {
            //     console.log('wtf');
            // }
        } else {
            localStorage.setItem('isFullscreen', false);
            setShowIcon(true);
        }
        document.addEventListener(
            'fullscreenchange',
            () => {
                if (
                    !document.webkitIsFullScreen &&
                    !document.mozFullScreen &&
                    !document.msFullscreenElement
                ) {
                    localStorage.setItem('isFullscreen', false);
                    setShowIcon(true);
                } else {
                    localStorage.setItem('isFullscreen', true);
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

import MovingDirection from './MovingDirection.js';
import Enemy from './Enemy.js';
import { router } from 'next/router';

let gameWon = false;

// window.addEventListener('gamepadconnected', (e) => {
//   console.log('gamepad connected:');
//   console.log(console.log(e.gamepad));
// });

// window.addEventListener('gamepaddisconnected', (e) => {
//   console.log('gamepad disconnected:');
//   console.log(console.log(e.gamepad));
// });

// function handleJoystickMovement(gamepads) {

export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimationTimer = null;

        this.pacmanRotation = this.Rotation.right;
        // this.wakaSound = new Audio('sounds/waka.wav');
        this.wakaSound = new Audio('/sounds/waka.wav');
        this.dotsEaten = 0;
        this.iconsEaten = 0;
        this.monstersEaten = 0;

        // this.powerDotSound = new Audio('sounds/power_dot.wav');
        this.powerDotSound = new Audio('/sounds/power_dot.wav');
        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;
        this.timers = [];

        // this.eatGhostSound = new Audio('sounds/eat_ghost.wav');
        this.eatGhostSound = new Audio('/sounds/eat_ghost.wav');

        this.madeFirstMove = false;

        document.addEventListener('keydown', this.#keydown);
        router.pathname === '/game' &&
            window.requestAnimationFrame(this.handleJoystickPlay);

        this.#loadPacmanImages();
    }

    Rotation = {
        right: 0,
        down: 1,
        left: 2,
        up: 3,
    };

    draw(ctx, pause, enemies) {
        if (!pause) {
            this.#move();
            // this.#animate();
            this.#changeSpriteDirection();
        }
        this.#eatDot();
        this.#eatIcon();
        this.#eatPowerDot();
        this.#eatGhost(enemies);

        const size = this.tileSize / 2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        // ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.drawImage(
            this.pacmanImages[this.pacmanImageIndex],
            -size,
            -size,
            this.tileSize,
            this.tileSize
        );

        ctx.restore();

        // ctx.drawImage(
        //   this.pacmanImages[this.pacmanImageIndex],
        //   this.x,
        //   this.y,
        //   this.tileSize,
        //   this.tileSize
        // );
    }

    #loadPacmanImages() {
        const pacmanImage1 = new Image();
        // pacmanImage1.src = "images/pac0.png";
        // pacmanImage1.src = '/pac0.png';
        pacmanImage1.src = '/pacman-new-right.png';

        const pacmanImage2 = new Image();
        // pacmanImage2.src = "images/pac1.png";
        pacmanImage2.src = '/pacman-new-left.png';

        const pacmanImage3 = new Image();
        // pacmanImage3.src = "images/pac2.png";
        pacmanImage3.src = '/pacman-new-up.png';

        const pacmanImage4 = new Image();
        // pacmanImage4.src = "images/pac1.png";
        pacmanImage4.src = '/pacman-new-down.png';

        this.pacmanImages = [
            pacmanImage1,
            pacmanImage2,
            pacmanImage3,
            pacmanImage4,
        ];

        this.pacmanImageIndex = 0;
    }

    #keydown = (event) => {
        //up
        if (event.keyCode == 38) {
            if (this.currentMovingDirection == MovingDirection.down)
                this.currentMovingDirection = MovingDirection.up;
            this.requestedMovingDirection = MovingDirection.up;
            this.madeFirstMove = true;
        }
        //down
        if (event.keyCode == 40) {
            if (this.currentMovingDirection == MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
            this.requestedMovingDirection = MovingDirection.down;
            this.madeFirstMove = true;
        }
        //left
        if (event.keyCode == 37) {
            if (this.currentMovingDirection == MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
            this.requestedMovingDirection = MovingDirection.left;
            this.madeFirstMove = true;
        }
        //right
        if (event.keyCode == 39) {
            if (this.currentMovingDirection == MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
            this.requestedMovingDirection = MovingDirection.right;
            this.madeFirstMove = true;
        }
    };

    handleJoystickPlay() {
        if (router.pathname === '/game') {
            const gamepads = navigator.getGamepads();
            if (gamepads[0]) {
                const joystick = gamepads[0];
                const left = joystick.axes[0] === -1;
                const right = joystick.axes[0] === 1;
                const up = joystick.axes[1] === -1;
                const down = joystick.axes[1] === 1;
                if (joystick) {
                    //up
                    if (up) {
                        if (this.currentMovingDirection == MovingDirection.down)
                            this.currentMovingDirection = MovingDirection.up;
                        this.requestedMovingDirection = MovingDirection.up;
                        this.madeFirstMove = true;
                    }
                    //down
                    if (down) {
                        if (this.currentMovingDirection == MovingDirection.up)
                            this.currentMovingDirection = MovingDirection.down;
                        this.requestedMovingDirection = MovingDirection.down;
                        this.madeFirstMove = true;
                    }
                    //left
                    if (left) {
                        if (
                            this.currentMovingDirection == MovingDirection.right
                        )
                            this.currentMovingDirection = MovingDirection.left;
                        this.requestedMovingDirection = MovingDirection.left;
                        this.madeFirstMove = true;
                    }
                    //right
                    if (right) {
                        if (this.currentMovingDirection == MovingDirection.left)
                            this.currentMovingDirection = MovingDirection.right;
                        this.requestedMovingDirection = MovingDirection.right;
                        this.madeFirstMove = true;
                    }
                }
            }
            // window.requestAnimationFrame(this.handleJoystickMovement);
        }
    }

    #move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection) {
            if (
                Number.isInteger(this.x / this.tileSize) &&
                Number.isInteger(this.y / this.tileSize)
            ) {
                if (
                    !this.tileMap.didCollideWithEnvironment(
                        this.x,
                        this.y,
                        this.requestedMovingDirection
                    )
                )
                    this.currentMovingDirection = this.requestedMovingDirection;
            }
        }

        if (
            this.tileMap.didCollideWithEnvironment(
                this.x,
                this.y,
                this.currentMovingDirection
            )
        ) {
            this.pacmanAnimationTimer = null;
            this.pacmanImageIndex = 1;
            return;
        } else if (
            this.currentMovingDirection != null &&
            this.pacmanAnimationTimer == null
        ) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
        }

        switch (this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up;
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down;
                break;
            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left;
                break;
            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right;
                break;
        }
    }

    #changeSpriteDirection() {
        if (this.pacmanRotation === this.Rotation.right) {
            this.pacmanImageIndex = 0;
        } else if (this.pacmanRotation === this.Rotation.left) {
            this.pacmanImageIndex = 1;
        } else if (this.pacmanRotation === this.Rotation.up) {
            this.pacmanImageIndex = 2;
        } else if (this.pacmanRotation === this.Rotation.down) {
            this.pacmanImageIndex = 3;
        }
    }

    // #animate() {
    //   if (this.pacmanAnimationTimer == null) {
    //     return;
    //   }
    //   this.pacmanAnimationTimer--;
    //   if (this.pacmanAnimationTimer == 0) {
    //     this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
    //     this.pacmanImageIndex++;
    //     if (this.pacmanImageIndex == this.pacmanImages.length)
    //       this.pacmanImageIndex = 0;
    //   }
    // }

    #eatDot() {
        if (this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
            // this.wakaSound.play();
            this.dotsEaten++;
        }
    }

    #eatIcon() {
        if (this.tileMap.eatIcon(this.x, this.y) && this.madeFirstMove) {
            // this.wakaSound.play();
            this.iconsEaten++;
        }
    }

    #eatPowerDot() {
        if (this.tileMap.eatPowerDot(this.x, this.y)) {
            // this.powerDotSound.play();
            this.powerDotActive = true;
            this.powerDotAboutToExpire = false;
            this.timers.forEach((timer) => clearTimeout(timer));
            this.timers = [];

            let powerDotTimer = setTimeout(() => {
                this.powerDotActive = false;
                this.powerDotAboutToExpire = false;
                // }, 1000 * 6);
            }, 1000 * 3);

            this.timers.push(powerDotTimer);

            let powerDotAboutToExpireTimer = setTimeout(() => {
                this.powerDotAboutToExpire = true;
                // }, 1000 * 3);
            }, 1000 * 2);

            this.timers.push(powerDotAboutToExpireTimer);
        }
    }

    #eatGhost(enemies) {
        if (this.powerDotActive) {
            const collideEnemies = enemies.filter((enemy) =>
                enemy.collideWith(this)
            );
            collideEnemies.forEach((enemy) => {
                enemies.splice(enemies.indexOf(enemy), 1);
                this.monstersEaten++;
                // this.eatGhostSound.play();
                setTimeout(() => {
                    // enemies.push(enemy);
                    // this.tileMap.addEnemy();
                    enemies.push(
                        new Enemy(
                            // column * this.tileSize,
                            6 * 32,
                            // row * this.tileSize,
                            Math.random() >= 0.5 ? 15 * 32 : 3 * 32,
                            // 15 * 32,
                            // this.tileSize,
                            32,
                            // velocity,
                            2,
                            this.tileMap
                        )
                    );
                }, 5000);
            });
        }
    }
}

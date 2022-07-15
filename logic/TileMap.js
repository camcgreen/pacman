import Pacman from './Pacman.js';
import Enemy from './Enemy.js';
import MovingDirection from './MovingDirection.js';

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        // this.yellowDot.src = "images/yellowDot.png";
        // this.yellowDot.src = '/yellowDot.png';
        this.yellowDot.src = '/whiteDot.png';
        // this.yellowDot.src = '/yellowDot1.png';

        this.pinkDot = new Image();
        // this.pinkDot.src = "images/pinkDot.png";
        this.pinkDot.src = '/pinkDot.png';
        // this.pinkDot.src = '/pinkDot1.png';

        this.wall = new Image();
        // this.wall.src = "images/wall.png";
        this.wall.src = '/wall.png';

        this.wallHorizontal = new Image();
        this.wallHorizontal.src = '/wall-horizontal.png';

        this.wallVertical = new Image();
        this.wallVertical.src = '/wall-vertical.png';

        this.wallTopEnd = new Image();
        this.wallTopEnd.src = '/wall-top-end.png';

        this.wallBottomEnd = new Image();
        this.wallBottomEnd.src = '/wall-bottom-end.png';

        this.wallTopRightCorner = new Image();
        this.wallTopRightCorner.src = '/wall-top-right-corner.png';

        this.wallTopLeftCorner = new Image();
        this.wallTopLeftCorner.src = '/wall-top-left-corner.png';

        this.wallBottomRightCorner = new Image();
        this.wallBottomRightCorner.src = '/wall-bottom-right-corner.png';

        this.wallBottomLeftCorner = new Image();
        this.wallBottomLeftCorner.src = '/wall-bottom-left-corner.png';

        this.wallRightEnd = new Image();
        this.wallRightEnd.src = '/wall-right-end.png';

        this.iconPhone = new Image();
        this.iconPhone.src = '/icon-phone.png';

        this.iconTablet = new Image();
        this.iconTablet.src = '/icon-tablet.png';

        this.iconLaptop = new Image();
        this.iconLaptop.src = '/icon-laptop.png';

        this.iconHeadphones = new Image();
        this.iconHeadphones.src = '/icon-headphones.png';

        this.wallLeftEnd = new Image();
        this.wallLeftEnd.src = '/wall-left-end.png';

        this.powerDot = this.pinkDot;
        this.powerDotAnmationTimerDefault = 120;
        this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
    }

    //1 - wall
    //0 - dots
    //4 - pacman
    //5 - empty space
    //7 - power dot
    //ADDTIONS
    //8 - wall horizontal
    //9 - wall vertical
    //10 - wall top end
    //11 - wall bottom end
    //12 - wall top right corner
    //13 - wall top left corner
    //14 - wall bottom right corner
    //15 - wall bottom left corner
    //16 - wall right end
    //17 - phone
    //18 - tablet
    //19 - laptop
    //20 - headphones
    //21 - wall left end
    //22 - enemy

    map = [
        [5, 5, 5, 5, 5, 13, 8, 12, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 9, 7, 9, 5, 5, 5, 5, 5],
        [13, 8, 8, 8, 8, 14, 0, 15, 8, 8, 8, 8, 12],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 10, 0, 0, 0, 0, 0, 0, 0, 10, 0, 9],
        [9, 0, 11, 0, 10, 0, 4, 0, 10, 7, 11, 0, 9],
        [9, 0, 0, 0, 15, 8, 8, 8, 14, 0, 0, 0, 9],
        [9, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 9],
        [15, 8, 12, 0, 0, 21, 8, 16, 0, 0, 13, 8, 14],
        [5, 5, 9, 22, 0, 0, 7, 0, 0, 22, 9, 5, 5],
        [13, 8, 14, 0, 0, 21, 8, 16, 0, 0, 15, 8, 12],
        [9, 19, 0, 0, 0, 0, 22, 0, 0, 0, 0, 18, 9],
        [9, 0, 10, 0, 0, 0, 10, 0, 0, 0, 10, 0, 9],
        [9, 0, 9, 7, 0, 0, 11, 0, 0, 0, 9, 0, 9],
        [9, 0, 15, 8, 16, 0, 0, 0, 21, 8, 14, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [15, 8, 8, 8, 8, 12, 0, 13, 8, 8, 8, 8, 14],
        [5, 5, 5, 5, 5, 9, 7, 9, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 15, 8, 14, 5, 5, 5, 5, 5],
    ];

    // map = [
    //   [13, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
    //   [9, 7, 0, 17, 4, 0, 0, 0, 0, 19, 0, 7, 9],
    //   [9, 0, 13, 8, 8, 8, 8, 8, 16, 0, 10, 0, 9],
    //   [9, 0, 9, 6, 0, 0, 0, 0, 0, 0, 9, 0, 9],
    //   [9, 0, 9, 7, 13, 8, 16, 0, 10, 0, 9, 0, 9],
    //   [9, 0, 9, 0, 9, 0, 0, 0, 9, 0, 9, 0, 9],
    //   [9, 0, 9, 17, 9, 0, 10, 0, 9, 18, 9, 0, 9],
    //   [9, 0, 9, 0, 9, 0, 9, 0, 11, 0, 9, 0, 9],
    //   [9, 0, 11, 0, 11, 0, 11, 0, 0, 0, 11, 0, 9],
    //   [9, 6, 0, 18, 0, 0, 0, 0, 0, 0, 20, 6, 9],
    //   [15, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 14],
    // ];

    // map = [
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 7, 1],
    //   [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    //   [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    //   [1, 0, 1, 7, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    //   [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // ];

    draw(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 1) {
                    // this.#drawWall(ctx, column, row, this.tileSize);
                    this.#drawWall(ctx, this.wall, column, row, this.tileSize);
                } else if (tile === 0) {
                    this.#drawDot(ctx, column, row, this.tileSize);
                } else if (tile == 7) {
                    this.#drawPowerDot(ctx, column, row, this.tileSize);
                } else if (tile === 8) {
                    this.#drawWall(
                        ctx,
                        this.wallHorizontal,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 9) {
                    this.#drawWall(
                        ctx,
                        this.wallVertical,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 10) {
                    this.#drawWall(
                        ctx,
                        this.wallTopEnd,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 11) {
                    this.#drawWall(
                        ctx,
                        this.wallBottomEnd,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 12) {
                    this.#drawWall(
                        ctx,
                        this.wallTopRightCorner,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 13) {
                    this.#drawWall(
                        ctx,
                        this.wallTopLeftCorner,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 14) {
                    this.#drawWall(
                        ctx,
                        this.wallBottomRightCorner,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 15) {
                    this.#drawWall(
                        ctx,
                        this.wallBottomLeftCorner,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 21) {
                    this.#drawWall(
                        ctx,
                        this.wallLeftEnd,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 16) {
                    this.#drawWall(
                        ctx,
                        this.wallRightEnd,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 17) {
                    this.#drawIcon(
                        ctx,
                        this.iconPhone,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 18) {
                    this.#drawIcon(
                        ctx,
                        this.iconTablet,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 19) {
                    this.#drawIcon(
                        ctx,
                        this.iconLaptop,
                        column,
                        row,
                        this.tileSize
                    );
                } else if (tile === 20) {
                    this.#drawIcon(
                        ctx,
                        this.iconHeadphones,
                        column,
                        row,
                        this.tileSize
                    );
                } else {
                    this.#drawBlank(ctx, column, row, this.tileSize);
                }

                // ctx.strokeStyle = "yellow";
                // ctx.strokeRect(
                //   column * this.tileSize,
                //   row * this.tileSize,
                //   this.tileSize,
                //   this.tileSize
                // );
            }
        }
    }

    #drawDot(ctx, column, row, size) {
        ctx.drawImage(
            this.yellowDot,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    #drawIcon(ctx, spr, column, row, size) {
        ctx.drawImage(
            // this.yellowDot,
            spr,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    #drawPowerDot(ctx, column, row, size) {
        this.powerDotAnmationTimer--;
        if (this.powerDotAnmationTimer === 0) {
            this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
            if (this.powerDot == this.pinkDot) {
                this.powerDot = this.yellowDot;
            } else {
                this.powerDot = this.pinkDot;
            }
        }
        ctx.drawImage(this.powerDot, column * size, row * size, size, size);
    }

    #drawWall(ctx, spr, column, row, size) {
        ctx.drawImage(
            // this.wall,
            spr,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    #drawBlank(ctx, column, row, size) {
        ctx.fillStyle = 'black';
        ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
    }

    getPacman(velocity) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 4) {
                    this.map[row][column] = 0;
                    return new Pacman(
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this
                    );
                }
            }
        }
    }
    getEnemies(velocity) {
        const enemies = [];

        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                if (tile == 22) {
                    this.map[row][column] = 0;
                    enemies.push(
                        new Enemy(
                            column * this.tileSize,
                            row * this.tileSize,
                            this.tileSize,
                            velocity,
                            this
                        )
                    );
                }
            }
        }
        return enemies;
    }

    addEnemy() {
        console.log('adding enemy');
        this.map[15][1] = 22;
        const enemies = this.getEnemies(2);
        console.log(enemies);
        enemies.push(
            new Enemy(
                1 * this.tileSize,
                15 * this.tileSize,
                this.tileSize,
                // velocity,
                2,
                this
            )
        );
        console.log(enemies);
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideWithEnvironment(x, y, direction) {
        if (direction == null) {
            return;
        }

        if (
            Number.isInteger(x / this.tileSize) &&
            Number.isInteger(y / this.tileSize)
        ) {
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;

            switch (direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            }
            const tile = this.map[row][column];
            // if (tile === 1) {
            if (
                tile === 1 ||
                tile === 8 ||
                tile === 9 ||
                tile === 10 ||
                tile === 11 ||
                tile === 12 ||
                tile === 13 ||
                tile === 14 ||
                tile === 15 ||
                tile === 16 ||
                tile === 21
            ) {
                return true;
            }
        }
        return false;
    }

    didWin() {
        return this.#dotsLeft() === 0;
    }

    #dotsLeft() {
        return this.map.flat().filter((tile) => tile === 0).length;
    }

    eatDot(x, y) {
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if (Number.isInteger(row) && Number.isInteger(column)) {
            if (this.map[row][column] === 0) {
                this.map[row][column] = 5;
                setTimeout(() => {
                    this.map[row][column] = 0;
                }, 5000);
                return true;
            }
        }
        return false;
    }

    randomRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    eatIcon(x, y) {
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if (Number.isInteger(row) && Number.isInteger(column)) {
            // if (this.map[row][column] === 0) {
            if (
                this.map[row][column] === 17 ||
                this.map[row][column] === 18 ||
                this.map[row][column] === 19 ||
                this.map[row][column] === 20
            ) {
                this.map[row][column] = 5;
                setTimeout(() => {
                    // this.map[row][column] = 7;
                    this.map[row][column] = this.randomRange(17, 20);
                }, 10000);
                return true;
            }
        }
        return false;
    }

    eatPowerDot(x, y) {
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if (Number.isInteger(row) && Number.isInteger(column)) {
            const tile = this.map[row][column];
            if (tile === 7) {
                this.map[row][column] = 5;
                setTimeout(() => {
                    this.map[row][column] = 7;
                    // }, 5000);
                }, 10000);
                return true;
            }
        }
        return false;
    }
}

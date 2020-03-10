window.onload = () => {
    document.getElementById("start-button").onclick = () => {
        startGame();
    };
    // Getting the canvas from html page
    let ctx = document.getElementById("canvas").getContext("2d");
    // For ending the game
    let runningGame = true;
    // Create car objectfksdjf
    let player = {
        x: 220,
        y: 400,
        width: 50,
        height: 50,
        img: new Image(),
        rightPressed: function () {
            if (this.x < 450 - this.width) {
                this.x += 15
            }
        },
        leftPressed: function () {
            if (this.x >= 50) {
                this.x -= 15;
            }
        },
        upPressed: function () {
            if (this.y >= 50) {
                this.y -= 15
            }
        },
        downPressed: function () {
            if (this.y <= 400) {
                this.y += 15
            }
        },
        update: function () {
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            // this.img.src = "car.png";
            // ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black'
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        left: function () {
            return this.x;
        },
        top: function () {
            return this.y;
        },
        right: function () {
            return this.x + this.width;
        },
        bottom: function () {
            return this.y + this.height;
        },
        crash: function (obstacle) {
            return !(
                this.bottom() < obstacle.top() ||
                this.top() > obstacle.bottom() ||
                this.right() < obstacle.left() ||
                this.left() > obstacle.right()
            );
        },
        // win: function (winObj) {
        //     return (
        //         this.bottom() < winObj.top() ||
        //         this.top() > winObj.bottom() ||
        //         this.right() < winObj.left() ||
        //         this.left() > winObj.right()
        //     );
        // }
    };
    // Create obstacles
    class obstacle {
        constructor(posX) {
            this.x = posX;
            this.y = 0;
            this.width = 20;
            this.height = 20;
            this.color = 'green';
            this.speedY = 2;
        }
        update() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // this.img.src = "car.png";
            // ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
            this.y += 2;
        }
        top() {
            return this.y;
        }
        left() {
            return this.x;
        }
        bottom() {
            return this.y + this.height;
        }
        right() {
            return this.x + this.width;
        }
        clear() {
            let prevCoords = {};
            // prevCoords.x = this.x;
            // console.log("outPut: obstacle -> clear -> prevCoords.x", prevCoords.x)
            // prevCoords.y = this.y - 2;
            // console.log("outPut: obstacle -> clear -> prevCoords.y", prevCoords.y)
            // lineWidth:fix
            // ctx.clearRect(this.x, this.y + 2, this.width, this.height)
            ctx.clearRect(0, 0, canvas.width, canvas.height);;
        };
    }

    // class objectMoney extends object {
    //     constructor(posX) {
    //         super(posX)
    //         this.y = 0;
    //         this.width = 20;
    //         this.height = 20;
    //         this.color = 'green';
    //         this.speedY = 2;
    //         this.img = new Image()
    //     }
    // }
    // class objectHealth extends object {
    //     constructor(posX) {
    //         super(posX)
    //         this.y = 0;
    //         this.width = 20;
    //         this.height = 20;
    //         this.color = 'blue';
    //         this.speedY = 2;
    //         this.img = new Image()
    //     }
    // }
    // class objectLove extends object {
    //     constructor(posX) {
    //         super(posX)
    //         this.y = 0;
    //         this.width = 20;
    //         this.height = 20;
    //         this.color = 'red';
    //         this.speedY = 2;
    //         this.img = new Image()
    //     }
    // }
    // class objectLeisure extends object {
    //     constructor(posX) {
    //         super(posX)
    //         this.y = 0;
    //         this.width = 20;
    //         this.height = 20;
    //         this.color = 'yellow';
    //         this.speedY = 2;
    //         this.img = new Image()
    //     }
    // }

    // class winObject {
    //     constructor(posX) {
    //         this.x = posX;
    //         this.y = 0;
    //         this.width = 100;
    //         this.height = 50;
    //         this.color = 'blue';
    //         this.speedY = 2;
    //     }
    //     update() {
    //         ctx.fillStyle = this.color;
    //         ctx.fillRect(this.x, this.y, this.width, this.height);
    //         this.y += 2;
    //     }
    //     top() {
    //         return this.y - 8;
    //     }
    //     left() {
    //         return this.x - 8;
    //     }
    //     bottom() {
    //         return this.y + this.height - 8;
    //     }
    //     right() {
    //         return this.x + this.width - 8;
    //     }
    // }


    let counter = 0;
    let obstaclesArr = [];

    // let obstaclesMoneyArr = [];
    // let obstaclesHealthArr = [];
    // let obstaclesLoveArr = [];
    // let obstaclesLeisureArr = [];
    // let winObj = null
    let score = 0;

    let draw = () => {
        if (!runningGame) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        counter++;
        // drawing road image
        //   let roadImg = new Image();
        //   roadImg.src = "images/road.png";
        //   ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
        // creat obstacles
        let ind
        obstaclesArr.forEach((e, i) => {
            if (player.crash(e)) {
                // runningGame = false;
                ind = i
                score += 1
                console.log("outPut: draw -> score", score)
                // e.clear()
            }
            e.update();

        });
        if (ind) {
            obstaclesArr.splice(ind, 1)

        }
        player.update();

        if (counter % 120 === 0) {
            let randomPox = Math.floor(Math.random() * (400 - 50) + 50);
            let randomPox1 = Math.floor(Math.random() * (400 - 50) + 50);
            if (randomPox <= 450 && randomPox1 <= 450 && randomPox != randomPox1) {
                obstaclesArr.push(new obstacle(randomPox));
                obstaclesArr.push(new obstacle(randomPox1));

            }
        }
        // if (counter === 400) {
        //     let randomPoxWin = Math.floor(Math.random() * (400 - 50) + 50);
        //     if (randomPoxWin <= 450) {
        //         winObj = new winObject(randomPoxWin)
        //     }
        // }
        // if (winObj !== null) {
        //     winObj.update()
        //     if (player.crash(winObj)) {
        //         main.startGame()

        //     }
        // }


        window.requestAnimationFrame(draw);
    };
    // Function for moving player right, left, up, down

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                player.leftPressed();
                break;
            case 39:
                player.rightPressed();
                break;
            case 38:
                player.upPressed()
                break;
            case 40:
                player.downPressed()
                break;

        }
    };
    // start game function
    function startGame() {
        draw();
    }
};
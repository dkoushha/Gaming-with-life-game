let player = {
    x: (canvas.width / 2)-100,
    y: 500,
    width: 200,
    height: 200,
    img: new Image(),
    // to move the player to the right
    rightPressed: function () {
        // to keep it inside the canvas
        if (this.x < canvas.width - this.width) {
            this.x += 30;
        }
    },
    // to move the player to the left
    leftPressed: function () {
        // to keep it inside the canvas
        if (this.x >= 0) {
            this.x -= 30;
        }
    },
    upPressed: function () {
        if (this.y >= 50) {
            this.y -= 30;
        }
    },
    downPressed: function () {
        if (this.y <= canvas.height - this.height - 20) {
            this.y += 30;
        }
    },
    // to draw the player on the canvas
    update: function () {
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        //this.img.src = "images/player/face .png";
        this.imgSrc=["/images/player/face.png","/images/player/profileboy.png","/images/player/profilegirl.png"]
        if(gameStart){
            this.img.src=this.imgSrc[0]
            gameStart=false
        }
        if(UpDownDir){
            this.img.src=this.imgSrc[0]
            UpDownDir=false
        }
        if(leftDir){
            this.img.src=this.imgSrc[2]
            leftDir=false
        }
        if(rightDir){
            this.img.src=this.imgSrc[1]
            rightDir=false
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    },
    // declare the player borders
    left: function () {
        return this.x + 80;
    },
    top: function () {
        return this.y + 30;
    },
    right: function () {
        return this.x + this.width - 30;
    },
    bottom: function () {
        return this.y + this.height - 30;
    },
    // to check if the player collide with the objects
    crash: function (object) {
        return !(
            this.bottom() < object.top() ||
            this.top() > object.bottom() ||
            this.right() < object.left() ||
            this.left() > object.right()
        );
    }
};
// Create object class
class object {
    constructor(posX) {
        this.x = posX;
        this.y = 0;
        this.width = 50;
        this.height = 50;
    }
    // draw the object on canvas
    update() {
        ctx.fillStyle = this.color;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.y += this.speedY;
    }
    // declare the player borders
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
    crash(object) {
        return !(this.right() < object.left() || this.left() > object.right());
    }
}

// subclass for the money object
class objectMoney extends object {
    constructor(posX) {
        super(posX);
        this.color = "green";
        this.img = new Image();
        this.imgSrc = [
            "images/work/robber.png",
            "images/work/cash.png",
            "images/work/cook.png",
            "images/work/keyboard.png"
        ];
        this.img.src = this.imgSrc[Math.floor(Math.random() * this.imgSrc.length)];
        this.scoreType = "money";
        // add speed Y to change the speed later
        this.speedY = 2;
    }
}
// subclass for the health object
class objectHealth extends object {
    constructor(posX) {
        super(posX);
        this.color = "blue";
        this.img = new Image();
        this.imgSrc = [
            "images/health/strong-man.png",
            "images/health/avocado.png",
            "images/health/canned-fish.png",
            "images/health/cycling.png",
            "images/health/hot-meal.png",
            "images/health/jumping-rope.png",
            "images/health/skier.png"
        ];
        this.img.src = this.imgSrc[Math.floor(Math.random() * this.imgSrc.length)];
        this.scoreType = "health";
        // add speed Y to change the speed later
        this.speedY = 2;
    }
}

// subclass for the love object
class objectLove extends object {
    constructor(posX) {
        super(posX);
        this.color = "red";
        this.img = new Image();
        this.imgSrc = [
            "images/love/headshot.png",
            "images/love/heart-organ.png",
            "images/love/paw-heart.png"
        ];
        this.img.src = this.imgSrc[Math.floor(Math.random() * this.imgSrc.length)];
        this.scoreType = "love";
        // add speed Y to change the speed later
        this.speedY = 3;
    }
}

// subclass for the leisure object
class objectEntertainment extends object {
    constructor(posX) {
        super(posX);
        this.color = "yellow";
        this.img = new Image();
        this.imgSrc = [
            "images/coffee-beans.png",
            "images/airplane-departure.png",
            "images/console-controller.png",
            "images/medieval-pavilion.png",
            "images/musical-score.png",
            "images/popcorn.png",
            "images/tv.png",
            "images/wine-glass.png"
        ];
        this.img.src = this.imgSrc[Math.floor(Math.random() * this.imgSrc.length)];
        this.scoreType = "entertainment";
        // add speed Y to change the speed later
        this.speedY = 3;
    }
}
//subclass for objects
class obstacles extends object {
    constructor(posY) {
        super();
        this.y = posY;
        this.x = 0;
        //this.color="black"
        this.width = 150;
        this.height = 150;
        this.speedX = 2;
        this.img = new Image();
        this.imgSrc = [
            "/images/animation/Run (1).png",
            "/images/animation/Run (2).png",
            "/images/animation/Run (3).png",
            "/images/animation/Run (4).png",
            "/images/animation/Run (5).png",
            "/images/animation/Run (6).png",
            "/images/animation/Run (7).png",
            "/images/animation/Run (8).png"
        ];
        this.scoreType = "obstacles";
    }
    // Override update form parent to make enemies move horizontal
    update() {   
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.x += this.speedX;
    }
}
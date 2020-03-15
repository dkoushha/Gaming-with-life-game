let cheese = "lactose intolerant";
window.onload = () => {
  let title = new text(gameName, 650, 100, 50)
  title.updateTitle()
  let newText = new text(gameStory, 100, 200, 40)
  newText.update(100)
}
document.getElementById("start-button").onclick = () => {
  startGame();
};
// Getting the canvas from html page
let canvas = document.getElementById("canvas");
let ctx = document.getElementById("canvas").getContext("2d");


// For ending the game
let runningGame = true;
// Create player object
let player = {
  x: canvas.width / 2 - 200,
  y: 600,
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
    if (this.y <= 600) {
      this.y += 30;
    }
  },
  // to draw the player on the canvas
  update: function () {
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "red";
    this.img.src = "images/pikeman.png";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  // declare the player borders
  left: function () {
    return this.x + 20;
  },
  top: function () {
    return this.y + 20;
  },
  right: function () {
    return (this.x + this.width) - 20;
  },
  bottom: function () {
    return (this.y + this.height) - 20;
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
    this.width = 60;
    this.height = 60;
  }
  // draw the object on canvas
  update() {
    ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
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

class obstacles extends object {
  constructor(posX) {
    super(posX);
    //this.color="black"
    this.width = 150;
    this.height = 150;
    this.speedX = 2;
    this.img = new Image();
    this.img.src = "images/bully-minion.png";
    this.scoreType = "obstacles";
    this.speedY = 2;

  }
}


// declare the counter
let counter = 0;
// declare an objects array for all objects
let objectsArr = [];
// declare an object for the score of each category
let scores = {
  money: 0,
  health: 0,
  entertainment: 0,
  love: 0
};

// function to remove objects from the objects array when they reach the end of the canvas
function removeObject(objectsArr) {
  for (let i = 0; i < objectsArr.length; i++) {
    if (objectsArr[i].y >= 750) {
      let index = objectsArr.indexOf(objectsArr[i]);
      objectsArr.splice(index, 1);
    }
  }
}

// function to check if the new generated object collied with any of the objects arry items to avoid
// objects overlapping
function crashesWithAnything(obj) {
  for (i = 0; i < objectsArr.length; i++) {
    if (obj.crash(objectsArr[i])) {
      return true;
    }
  }
  return false;
}
let winGame = true
let draw2 = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let bgImg = new Image();
  bgImg.src = "images/794.jpg";
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  if (!runningGame && !winGame) {
    let winImg = new Image();
    winImg.src = "images/youwin.png";
    ctx.drawImage(winImg, 550, 200, 400, 400);
  } else {
    //CHANGE IMAGEEEEE
    let winImg = new Image();
    winImg.src = "images/bully-minion.png";
    ctx.drawImage(winImg, 550, 200, 400, 400);
  }

  window.requestAnimationFrame(draw2);
}


// function to draw the game on canvas
let draw = () => {
  if (!runningGame) {
    draw2()
    return;
  }

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // increase the counter
  counter++;


  //   drawing background image
  let bgImg = new Image();
  bgImg.src = "images/794.jpg";
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // draw the player
  player.update();

  // Loop inside the array of objects and clear the object from the screen if the player crash wit it
  // and add the score for the object category.
  // declare the index inside the array for the crash object
  let ind;
  objectsArr.forEach((e, i) => {
    if (player.crash(e)) {
      // add the score
      if (scores[e.scoreType] <= 9) {
        scores[e.scoreType] += 1;
        console.log(scores[e.scoreType]);
      }
      // get the index of the object in the array
      ind = i;
      if (e.scoreType == "obstacles") {
        console.log("loser");
        runningGame = false;
      }
    }
    // draw the object in the array
    e.update();
  });
  // delete the object from the array to clear from the screen
  if (ind !== undefined) {
    objectsArr.splice(ind, 1);
  }


  // function to get random X position and creat random objects
  function randomObject() {
    // random X position
    // Creat a random object with random position
    // while (1) {
    let randomPoX = Math.floor(Math.random() * (canvas.width - 150));
    // if (!IsObjectThere(objectsArr, randomPoX)) {
    //to create more obstacles just multiply by more than 4
    switch (Math.floor(Math.random() * 6)) {
      case 1:
        return new objectMoney(randomPoX);
      case 2:
        return new objectHealth(randomPoX);
      case 3:
        return new objectLove(randomPoX);
      case 4:
        return new objectEntertainment(randomPoX);
      default:
        return new obstacles(randomPoX);
    }
    // }
    // }
  }


  // draw 4 random objects on canvas
  if (counter % 120 === 0) {
    // for loop to great more than one object
    for (let i = 0; i < 3; i++) {
      let newObject = randomObject();
      // if it doesn't collied with any other object to add it to the array
      if (!crashesWithAnything(newObject)) {
        objectsArr.push(newObject);
        // for (let i = 0; i < objectsArr.length; i++) {
        //   //player.crash(objectsArr[i])
        //   if (objectsArr[i].scoreType == "obstacles") {
        //     //runningGame=false
        //     console.log(objectsArr[i].scoreType);
        //   }
        // }
      }
    }

  }

  // change the speed of objects at specific time
  if (counter % 330 === 0) {
    // for loop inside the objects array to change y speed
    objectsArr.forEach((e) => {
      if (e.speedY === 2) {
        e.speedY = 3
      }
      if (e.speedY === 3) {
        e.speedY = 2
      }
    })
  }

  removeObject(objectsArr);
  //Draw the Items when picked in the pie chart
  drawMiddleAndAxis();
  if (scores.money <= 10) {
    drawItemMoney(scores.money);
  }
  if (scores.love <= 10) {
    drawItemLove(scores.love);
  }
  if (scores.health <= 10) {
    drawItemHealth(scores.health);
  }
  if (scores.entertainment <= 10) {
    drawItemLeisure(scores.entertainment);
  }


  if (
    scores.money >= 10 &&
    scores.love >= 10 &&
    scores.health >= 10 &&
    scores.entertainment >= 10
  ) {
    console.log("winner");
    //Draw winning image
    winGame = false
    runningGame = false;
  }
  //Every 40 seconds the score will go down by one on every section
  if (counter % 2400 === 0) {
    if (scores.money != 0) {
      scores.money -= 1;
    }
    if (scores.love != 0) {
      scores.love -= 1;
    }
    if (scores.health != 0) {
      scores.health -= 1;
    }
    if (scores.leisure != 0) {
      scores.leisure -= 1;
    }
  }
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
      player.upPressed();
      break;
    case 40:
      player.downPressed();
      break;
  }
};

// start game function
function startGame() {
  draw();
}
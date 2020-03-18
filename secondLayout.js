let canvas = document.getElementById("canvas");
let ctx = document.getElementById("canvas").getContext("2d");

window.onload = () => {
  beginning();
};

function beginning() {
  ctx.drawImage(this.imgBg, 0, 0, ctx.canvas.width, canvas.height);
  ctx.drawImage(this.imgStars, 0, 0, ctx.canvas.width, canvas.height);
  ctx.drawImage(this.imgBuilding, 0, 0, ctx.canvas.width, canvas.height);
  ctx.drawImage(this.imgLamps, 0, 0, ctx.canvas.width, canvas.height);
  // let title = new text(gameName, 550 - (gameName.length / 2), 100, 50);
  // title.updateTitle();
  let newText = new text(gameStory, 100, 150, 30);
  newText.update(100);
}
imgBuilding = new Image();
imgBuilding.src = "images/l4_buildings01.png";
imgLamps = new Image();
imgLamps.src = "images/l7_lamps.png";
imgBg = new Image();
imgBg.src = "images/l1_background.png";
imgStars = new Image();
imgStars.src = "images/l2_stars.png";
imgSun = new Image();
imgSun.src = "images/l2_sun.png";
imgClouds = new Image();
imgClouds.src = "images/l4_clouds.png";

// document.getElementById("start-button").onclick = () => {
//   startGame();
// };
// Getting the canvas from html page

// For ending the game
let runningGame = true;
// for winning the game
let winGame = true;

//Animation frames
let animationFrame = 0;

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
    // remove the obstacles
    if (
      objectsArr[i] != undefined &&
      objectsArr[i].scoreType == "obstacles" &&
      objectsArr[i].x >= 1700
    ) {
      let index1 = objectsArr.indexOf(objectsArr[i]);
      objectsArr.splice(index1, 1);
    }
  }
}

// function to check if the new generated object collied with any of the items in the objects arry  to avoid
// objects overlapping
function crashesWithAnything(obj) {
  for (i = 0; i < objectsArr.length; i++) {
    if (obj.crash(objectsArr[i])) {
      return true;
    }
  }
  return false;
}

// draw function for the page after winning or losing the game
let draw2 = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw the bg
  let bgImg = new Image();
  bgImg.src = "images/city04-01.png";
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  // draw img if the player won
  if (!runningGame && !winGame) {
    let winImg = new Image();
    winImg.src = "images/youwin.png";
    ctx.drawImage(winImg, 400, 150, 400, 400);
    // draw another img if the player lost
  } else {
    let winImg = new Image();
    winImg.src = "images/gameover.jpg";
    ctx.drawImage(winImg, 400, 150, 400, 400);
  }
  document.onkeydown = (e) => {
    if (e.keyCode === 32) {
      location.reload();
    }
  }


  window.requestAnimationFrame(draw2);
};



//Game sound effects
let gameSound = document.getElementById("game-sound");
let gameOverSound = document.getElementById("game-over");
let winGameSound = document.getElementById("win");
let moneySound = document.getElementById("money-sound");
let healthSound = document.getElementById("health-sound");
let entertainmentSound = document.getElementById("entertainment-sound");
let loveSound = document.getElementById("love-sound");

// function to draw the game on canvas
let draw = () => {
  if (!runningGame) {
    draw2();
    gameSound.pause();
    return;
  }
  gameSound.play();
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // increase the counter
  counter++;

  //   draw background image
  let bgImg = new Image();
  bgImg.src = "images/city04-01.png";
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // draw the player

  player.update()



  // Loop inside the array of objects and clear the object from the screen if the player crash wit it
  // and add the score for the object category.
  // declare the index inside the array for the crash object
  let ind;
  objectsArr.forEach((e, i) => {
    if (player.crash(e)) {
      // add the score
      if (scores[e.scoreType] <= 9) {
        scores[e.scoreType] += 1;
      }
      // get the index of the object in the array
      ind = i;
      if (e.scoreType == "money") {
        moneySound.play();
      }
      if (e.scoreType == "health") {
        healthSound.play();
      }
      if (e.scoreType == "entertainment") {
        entertainmentSound.play();
      }
      if (e.scoreType == "love") {
        loveSound.play();
      }

      if (e.scoreType == "obstacles") {
        console.log("loser");
        runningGame = false;
        gameOverSound.play();
      }
    }

    // draw the object in the array
    if (e.scoreType == "obstacles") {
      //Animation frame counter
      animationFrame = ++animationFrame % e.imgSrc.length;
      e.img.src = e.imgSrc[animationFrame];
      e.update();

      //window.requestAnimationFrame(e.update)
      // setInterval(()=>{
      //   e.update();

      //  },1000)
    } else {
      e.update();
    }
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
    let randomPoX = Math.floor(Math.random() * (canvas.width - 250) + 200);
    // let randomPoY = Math.floor(Math.random() * (canvas.height - 150));
    // if (!IsObjectThere(objectsArr, randomPoX)) {
    //to create more obstacles just multiply by more than 4
    switch (Math.floor(Math.random() * 5)) {
      case 1:
        return new objectMoney(randomPoX);
      case 2:
        return new objectHealth(randomPoX);
      case 3:
        return new objectLove(randomPoX);
      default:
        return new objectEntertainment(randomPoX);
    }
  }

  // draw 3 random objects on canvas
  if (counter % 120 === 0) {
    // for loop to great more than one object
    for (let i = 0; i < 3; i++) {
      let newObject = randomObject();
      // if it doesn't collied with any other object to add it to the array
      if (!crashesWithAnything(newObject)) {
        objectsArr.push(newObject);
      }
    }
  }

  // change the speed of objects at specific time
  if (counter % 330 === 0) {
    // loop inside the objects array to change y speed
    objectsArr.forEach(e => {
      if (e.speedY === 2) {
        e.speedY = 3;
      }
      if (e.speedY === 3) {
        e.speedY = 2;
      }
    });
  }

  if (counter % 500 === 0) {
    // for loop to great more than one object
    let randomPoY = Math.floor(Math.random() * (canvas.height - 150));
    let newObject = new obstacles(randomPoY);
    // if it doesn't collied with any other object to add it to the array
    if (!crashesWithAnything(newObject)) {
      objectsArr.push(newObject);
    }
  }

  // to remove the objects from the array after going outside the canvas
  removeObject(objectsArr);
  if (counter % 700 === 0) {
    let randomPoY = Math.floor(Math.random() * (canvas.height - 250));
    let newObstacle = new obstacles(randomPoY);
    objectsArr.push(newObstacle);
    // console.log(newObstacle);
  }
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

  // to win the game
  if (
    scores.money >= 10 &&
    scores.love >= 10 &&
    scores.health >= 10 &&
    scores.entertainment >= 10
  ) {
    console.log("winner");
    //Draw winning image
    winGame = false;
    runningGame = false;
    winGameSound.play();
  }
  //Every 30 seconds the score will go down by one on every section
  if (counter % 1800 === 0) {
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

document.onkeydown = key

let leftDir = false
let rightDir = false
let UpDownDir = false
let gameStart = false

function key(e) {
  switch (e.keyCode) {
    case 37:
      player.leftPressed();
      leftDir = true;
      break;
    case 39:
      player.rightPressed();
      rightDir = true;
      break;
    case 38:
      player.upPressed();
      UpDownDir = true;
      break;
    case 40:
      player.downPressed();
      UpDownDir = true;
      break;
    case 13:
      startGame();
      gameStart = true
      break;
  }
}


function startGame() {
  draw();
}
let cheese = "lactose intolerant";
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
  rightPressed: function() {
    // to keep it inside the canvas
    if (this.x < 900 - this.width) {
      this.x += 30;
    }
  },
  // to move the player to the left
  leftPressed: function() {
    // to keep it inside the canvas
    if (this.x >= 50) {
      this.x -= 30;
    }
  },
  //   upPressed: function() {
  //     if (this.y >= 50) {
  //       this.y -= 15;
  //     }
  //   },
  //   downPressed: function() {
  //     if (this.y <= 400) {
  //       this.y += 15;
  //     }
  //   },
  // to draw the player on the canvas
  update: function() {
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    this.img.src = "images/pikeman.png";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  // declare the player borders
  left: function() {
    return this.x;
  },
  top: function() {
    return this.y;
  },
  right: function() {
    return this.x + this.width;
  },
  bottom: function() {
    return this.y + this.height;
  },
  // to check if the player collide with the objects
  crash: function(object) {
    return !(
      this.bottom() < object.top() ||
      this.top() > object.bottom() ||
      this.right() < object.left() ||
      this.left() > object.right()
    );
  }
  // win: function (winObj) {
  //     return (
  //         this.bottom() < winObj.top() ||
  //         this.top() > winObj.bottom() ||
  //         this.right() < winObj.left() ||
  //         this.left() > winObj.right()
  //     );
  // }
};
// Create object class
class object {
  constructor(posX) {
    this.x = posX;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.speedY = 2;
  }
  // draw the object on canvas
  update() {
    // ctx.fillStyle = this.color;
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
    this.img.src = "images/robber.png";
    this.scoreType = "money";
  }
}
// subclass for the health object
class objectHealth extends object {
  constructor(posX) {
    super(posX);
    this.color = "blue";
    this.img = new Image();
    this.img.src = "images/strong-man.png";
    this.scoreType = "health";
  }
}

// subclass for the love object
class objectLove extends object {
  constructor(posX) {
    super(posX);
    this.color = "red";
    this.img = new Image();
    this.img.src = "images/headshot.png";
    this.scoreType = "love";
  }
}

// subclass for the leisure object
class objectLeisure extends object {
  constructor(posX) {
    super(posX);
    this.color = "yellow";
    this.img = new Image();
    this.img.src = "images/juggler.png";
    this.scoreType = "leisure";
  }
}

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
// let winObj = null

// declare the counter
let counter = 0;
// declare an objects array for all objects
let objectsArr = [];
// declare an object for the score of each category
let scores = {
  money: 0,
  health: 0,
  leisure: 0,
  love: 0
};

function removeObject(objectsArr) {
  for (let i = 0; i < objectsArr.length; i++) {
    if (objectsArr[i].y >= 750) {
      let index = objectsArr.indexOf(objectsArr[i]);
      objectsArr.splice(index, 1);
    }
  }
}

function IsObjectThere(objectsArr, x) {
  objectsArr.forEach(e => {
    if (x === e.x || x === e.x + 250) {
      return true;
    }
  });
  return false;
}

// function to draw the game on canvas
let draw = () => {
  if (!runningGame) {
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
      scores[e.scoreType] += 1;
      // get the index of the object in the array
      ind = i;
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
    while (1) {
      let randomPoX = Math.floor(Math.random() * (1700 - 200) + 100);
      if (!IsObjectThere(objectsArr, randomPoX)) {
        switch (Math.floor(Math.random() * 4)) {
          case 1:
            return new objectMoney(randomPoX);
          case 2:
            return new objectHealth(randomPoX);
          case 3:
            return new objectLove(randomPoX);
          default:
            return new objectLeisure(randomPoX);
        }
      }
    }
  }

  // draw 4 random objects on canvas
  if (counter % 120 === 0) {
    // for loop to great more than one object
    for (i = 0; i < 4; i++) {
      let newObject = randomObject();
      objectsArr.push(newObject);
    }
  }

  removeObject(objectsArr);

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

document.onkeydown = function(e) {
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

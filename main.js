//Code goes here
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let player = {
    x: 225,
    y: 250,
    width: 50,
    heigth: 50,
    frames: 0,
    gameScore: 0,
    update: function() {
      ctx.fillRect(this.x, this.y, this.width, this.heigth);
    },
    arrowRight: function() {
      if (this.x > canvas.width - 50) {
        this.x += 0;
      } else {
        this.x += 10;
      }
    },
    arrowLeft: function() {
      if (this.x < 0) {
        this.x -= 0;
      } else {
        this.x -= 10;
      }
    },
    arrowDown: function() {
      if (this.y > canvas.height - 55) {
        this.y += 0;
      } else {
        this.y += 10;
      }
    },
    arrowUp: function() {
      if (this.y < 5) {
        this.y -= 0;
      } else {
        this.y -= 10;
      }
    },
    top: function() {
      return this.y;
    },
    left: function() {
      return this.x + 25;
    },
    bottom: function() {
      return this.y + this.height;
    },
    right: function() {
      return this.x + this.width;
    },
    crashWith: function(item) {
      return !(
        this.bottom() < item.top() ||
        this.top() > item.bottom() ||
        this.right() < item.left() ||
        this.left() > item.right()
      );
    },
    
  };
  class Item {
    constructor(posX) {
      this.x = posX;
      this.y = 20;
      this.width = 50;
      this.height = 50;
    }
    update() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
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
  }
  let itemArr = [];
  itemArr.push(new Item(50));
  itemArr.push(new Item(220));
  itemArr.push(new Item(400));

  let gameRunning=true
  let draw = () => {
      if(!gameRunning){
          return
      }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    itemArr.forEach(item => {
      
      if (player.crashWith(item)) {
        // setTimeout(() => {
        //   alert("Item picked");
        // }, 0);
        draw2()
        //gameRunning=false
      }
      item.update();
    });
    player.update()

    window.requestAnimationFrame(draw);
  };
  let counter = 0;
  let obstaclesArr = [];

  let draw2 = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      counter++;
      obstaclesArr.forEach(e => {
          if (player.crashWith(e)) {
              //runningGame = false;
              gameRunning=false
          }
          e.update();
      });
      //player.update();

      if (counter % 120 === 0) {
          let randomPox = Math.floor(Math.random() * (400 - 50) + 50);
          let randomPox1 = Math.floor(Math.random() * (400 - 50) + 50);
          if (randomPox <= 450 && randomPox1 <= 450 && randomPox != randomPox1) {
              obstaclesArr.push(new Item(randomPox));
              obstaclesArr.push(new Item(randomPox1));
          }
      }

      window.requestAnimationFrame(draw);
  };

  document.onkeydown = event => {
    if (event.key === "ArrowRight") {
      player.arrowRight();
    }
    if (event.key === "ArrowLeft") {
      player.arrowLeft();
    }
    if (event.key === "ArrowDown") {
      player.arrowDown();
    }
    if (event.key === "ArrowUp") {
      player.arrowUp();
    }
  };

  function startGame() {
    draw();
  }
};

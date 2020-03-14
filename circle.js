// ****************************
// draw circle
// ****************************
let drawMiddleAndAxis = () => {
    //Center of the circle
    ctx.beginPath();
    ctx.arc(150, 150, 12, 0, Math.PI * 2);
    ctx.fillStyle = "black"; // !
    // fills the inner circle with black color
    ctx.fill();
    ctx.font = "18px serif";
    ctx.fillStyle = "black";
    ctx.fillText("Leisure ", 230, 255); 
    ctx.fillText("Money ", 230, 55); 
    ctx.fillText("Love ", 20, 55); 
    ctx.fillText("Health ", 20, 255); 
    ctx.closePath();

    //Y-Axis
    // ctx.beginPath();
    // ctx.strokeStyle="black"
    // ctx.lineWidth=2
    // //ctx.fillStyle = "black";
    // ctx.moveTo(150, 20);
    // ctx.lineTo(150, 280);
    // ctx.stroke();
    // //X-Axis
    // ctx.moveTo(20, 150);
    // ctx.lineTo(280, 150);
    // ctx.stroke();
    // ctx.closePath();
}

class Item {
    //40 as radius
    constructor(radius, startAngle, endAngle, color) {
        //40 as radius
        this.r = radius;
        this.x = 150;
        this.y = 150;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.antiClockwise = true;
        this.color = color;
    }
    drawPickedItem() {
        //console.log("hello");
        ctx.beginPath();
        // ctx.arc(x, y, radius, startAngle, endAngle)
        ctx.arc(
            this.x,
            this.y,
            this.r,
            this.startAngle,
            this.endAngle,
            this.antiClockwise
        );
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.color; // !
        ctx.stroke();
        ctx.closePath();
    }
}
//console.log(cheese)
//To draw 1/4 of a circle in the top right side
//Which is MONEY!


let drawItemMoney = (score) => {
    let startAngleMoney = 0;
    let endAngleMoney = (3 * Math.PI) / 2;
    let colorMoney = "green";
    let radius = 20
    for (let i = 0; i < score; i++) {
        let item = new Item(radius, startAngleMoney, endAngleMoney, colorMoney)
        radius += 10
        //We only need to catch the index in order to draw score!
        item.drawPickedItem()
    }
}

//To draw 1/4 of a circle in the top left side
//Which is LOVE!

let drawItemLove = (score) => {
    let startAngleLove = (3 * Math.PI) / 2;
    let endAngleLove = Math.PI;
    let colorLove = "red";
    let radius = 20
    for (let i = 0; i < score; i++) {
        let item = new Item(radius, startAngleLove, endAngleLove, colorLove)
        radius += 10
        //We only need to catch the index in order to draw score!
        item.drawPickedItem()
    }
}

//To draw 1/4 of a circle in the bottom left side
//Which is HEALTH!

let drawItemHealth = (score) => {
    let startAngleHealth = Math.PI;
    let endAngleHealth = Math.PI / 2;
    let colorHealth = "blue";

    let radius = 20
    for (let i = 0; i < score; i++) {
        let item = new Item(radius, startAngleHealth, endAngleHealth, colorHealth)
        radius += 10
        //We only need to catch the index in order to draw score!
        item.drawPickedItem()
    }
}

//To draw 1/4 of a circle in the bottom left side
//Which is Leisure!

let drawItemLeisure = (score) => {
    let startAngleLeisure = Math.PI / 2;
    let endAngleLeisure = 0;
    let colorLeisure = "orange";

    let radius = 20
    for (let i = 0; i < score; i++) {
        let item = new Item(radius, startAngleLeisure, endAngleLeisure, colorLeisure)
        radius += 10
        //We only need to catch the index in order to draw score!
        item.drawPickedItem()
    }
}



// ctx.font = "18px serif";
// ctx.fillStyle = "black";
// ctx.fillText("Score ", 220, 255); //+points
// ctx.closePath();

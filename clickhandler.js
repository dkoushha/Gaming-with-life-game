// var elem = document.getElementById('myCanvas'),
let canvasLeft = canvas.offsetLeft;
let canvasTop = canvas.offsetTop;
// context = elem.getContext('2d'),
elements = [];
let element = {
    top: 400,
    left: 500,
    width: 200,
    height: 50
}
class btnToClick {
    constructor(top, left, width, height) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height
    }
}

let startBtn = new btnToClick(400, 500, 200, 50)
let endBtn = new btnToClick(430, 500, 200, 50)


// Add event listener for `click` events.
canvas.addEventListener('click', function (event) {
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;

    // Collision detection between clicked offset and element.
    // elements.forEach(function (element) {
    if (y > startBtn.top && y < startBtn.top + startBtn.height &&
        x > startBtn.left && x < startBtn.left + startBtn.width) {
        startGame();
        gameStart = true;

    }


}, false);


canvas.addEventListener('click', function (event) {
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;

    // Collision detection between clicked offset and element.
    // elements.forEach(function (element) {
    if (y > endBtn.top && y < endBtn.top + endBtn.height &&
        x > endBtn.left && x < endBtn.left + endBtn.width) {
        location.reload()
    }


}, false);
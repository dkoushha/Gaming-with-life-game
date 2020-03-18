
let canvas = document.getElementById("canvas");
let ctx = document.getElementById("canvas").getContext("2d");
let character= new Image()
    imgSrc=["/images/animation/Run (1).png","/images/animation/Run (2).png","/images/animation/Run (3).png",
    "/images/animation/Run (4).png","/images/animation/Run (5).png","/images/animation/Run (6).png",
    "/images/animation/Run (7).png","/images/animation/Run (8).png"]

let indexFrame=0
let currentFrame=0
let frames=12
let x=200

function drawImage(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x+=10
    indexFrame= ++indexFrame%imgSrc.length
    character.src=imgSrc[indexFrame]
    ctx.drawImage(character,x,200,200,200)  
    
    
    //window.requestAnimationFrame(drawImage)
}

setInterval(()=>{
    drawImage()
},100)

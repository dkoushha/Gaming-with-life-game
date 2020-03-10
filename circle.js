let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

 // ****************************
    // draw circle
    // ****************************
    //Y-Axis
    ctx.beginPath()
    ctx.moveTo(150,0)
    ctx.lineTo(150,500)
    ctx.stroke()
    //X-Axis
    ctx.moveTo(0,150)
    ctx.lineTo(500,150)
    ctx.stroke()
    ctx.closePath()
    
    class Item{
        //50 as radius
       constructor(radius,startAngle,endAngle,color){
        //50 as radius
        this.r=radius
        this.x=150
        this.y=150
        this.startAngle=startAngle
        this.endAngle=endAngle
        this.antiClockwise=true
        this.color=color
       }
       drawPickedItem(){
        ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle)
        ctx.arc(this.x, this.y, this.r, this.startAngle, this.endAngle,this.antiClockwise);
        ctx.lineWidth = 20;
        ctx.strokeStyle = this.color; // !
        ctx.stroke();
        ctx.closePath();
       }


    }
    //To draw 1/4 of a circle in the top right side
    //Which is MONEY! 
    let startAngleMoney=0
    let endAngleMoney=3*Math.PI/2
    let colorMoney="green"
    //The radius will increment only by 20
    //First Item picked - itemMoney
    let itemMoney=new Item(50,startAngleMoney,endAngleMoney,colorMoney)
    itemMoney.drawPickedItem()
    //Second Item picked
    let item2Money=new Item(70,startAngleMoney,endAngleMoney,colorMoney)
    item2Money.drawPickedItem()
    //Third Item picked
    let item3Money=new Item(90,startAngleMoney,endAngleMoney,colorMoney)
    item3Money.drawPickedItem()
    //Fourth Item picked
    let item4Money=new Item(110,startAngleMoney,endAngleMoney,colorMoney)
    item4Money.drawPickedItem()

    //To draw 1/4 of a circle in the top left side
    //Which is LOVE!
    let startAngleLove=3*Math.PI/2
    let endAngleLove=Math.PI
    let colorLove="red"
    //First Item picked
    let itemLove=new Item(50,startAngleLove,endAngleLove,colorLove)
    itemLove.drawPickedItem()
    //Second Item picked
    let itemLove2=new Item(70,startAngleLove,endAngleLove,colorLove)
    itemLove2.drawPickedItem()
    //Third Item picked
    let itemLove3=new Item(90,startAngleLove,endAngleLove,colorLove)
    itemLove3.drawPickedItem()
    //Fourth Item picked
    let itemLove4=new Item(110,startAngleLove,endAngleLove,colorLove)
    itemLove4.drawPickedItem()

    //To draw 1/4 of a circle in the bottom left side
    //Which is HEALTH!
    let startAngleHealth=Math.PI
    let endAngleHealth=Math.PI/2
    let colorHealth="blue"
    //First Item picked
    let itemHealth=new Item(50,startAngleHealth,endAngleHealth,colorHealth)
    itemHealth.drawPickedItem()
    //Second Item picked
    let item2Health=new Item(70,startAngleHealth,endAngleHealth,colorHealth)
    item2Health.drawPickedItem()
    //Third Item picked
    let item3Health=new Item(90,startAngleHealth,endAngleHealth,colorHealth)
    item3Health.drawPickedItem()
    //Third Item picked
    let item4Health=new Item(110,startAngleHealth,endAngleHealth,colorHealth)
    item4Health.drawPickedItem()

    //To draw 1/4 of a circle in the bottom left side
    //Which is Leisure!
    let startAngleLeisure=Math.PI/2
    let endAngleLeisure=0
    let colorLeisure="orange"
    //First Item picked
    let itemLeisure=new Item(50,startAngleLeisure,endAngleLeisure,colorLeisure)
    itemLeisure.drawPickedItem()
    //Second Item picked
    let item2Leisure=new Item(70,startAngleLeisure,endAngleLeisure,colorLeisure)
    item2Leisure.drawPickedItem()
    //Third Item picked
    let item3Leisure=new Item(90,startAngleLeisure,endAngleLeisure,colorLeisure)
    item3Leisure.drawPickedItem()
    //Third Item picked
    let item4Leisure=new Item(110,startAngleLeisure,endAngleLeisure,colorLeisure)
    item4Leisure.drawPickedItem()

    //Center of the circle
    ctx.beginPath();
    ctx.arc(150, 150, 30, 0, Math.PI * 2);
    ctx.fillStyle = "black"; // !
    // fills the inner circle with red color
    ctx.fill();
    ctx.font = "18px serif";
    ctx.fillStyle = "black";
    ctx.fillText("Score ", 230, 255); //+points
    ctx.closePath();



    //To draw 1/4 of a circle

    // //Top-Right circle
    // ctx.beginPath();
    // // ctx.arc(x, y, radius, startAngle, endAngle)
    // ctx.arc(150, 150, 50, 0, 3*Math.PI / 2,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "green"; // !
    // ctx.stroke();
    // ctx.closePath();
    // //Second half circle
    // ctx.beginPath();
    // ctx.arc(150, 150, 70, 0, 3*Math.PI / 2,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "green"; 
    // ctx.stroke();
    // ctx.closePath();

    // //Top-Left circle
    // ctx.beginPath();
    // ctx.arc(150, 150, 50, 3*Math.PI/2,Math.PI,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "red"; // !
    // ctx.stroke();
    // ctx.closePath();
    // ctx.beginPath()
    // ctx.arc(150, 150, 70, 3*Math.PI/2,Math.PI,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "red"; // !
    // ctx.stroke();
    // ctx.closePath();

    // //Bottom-Left circle
    // ctx.beginPath()
    // ctx.arc(150, 150, 50, Math.PI,Math.PI/2,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
    // ctx.closePath();
    // ctx.beginPath()
    // ctx.arc(150, 150, 70, Math.PI,Math.PI/2,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
    // ctx.closePath();

    // //Bottom-Right circle
    // ctx.beginPath()
    // ctx.arc(150, 150, 50, Math.PI/2,0,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "yellow";
    // ctx.stroke();
    // ctx.closePath();
    // ctx.beginPath()
    // ctx.arc(150, 150, 70, Math.PI/2,0,true);
    // ctx.lineWidth = 20;
    // ctx.strokeStyle = "yellow";
    // ctx.stroke();
    // ctx.closePath();



    
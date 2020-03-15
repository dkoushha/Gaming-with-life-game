let gameStory = " The game story and how to play it will be here The game story and how to play it will be here "
let gameName = "game's name";

class text {
    constructor(string, x, y, lineHeight) {
        this.string = string;
        this.x = x;
        this.y = y;
        this.lineHeight = lineHeight;
        this.lineStartX = x;
        this.img = new Image();
        this.img.src = "images/pikeman.png";
    }
    update(speed) {
        let i = -30;
        let j = 0;
        let typeText = setInterval(() => {
            let letterWidth = ctx.measureText(this.string.charAt(i)).width;
            if (this.x + letterWidth >= canvas.width - this.lineStartX) {
                this.x = this.lineStartX;
                this.y += this.lineHeight;
            }
            if (j >= 30) {
                ctx.font = "40px Arial";
                ctx.fillText(this.string.charAt(i), this.x, this.y);
            }
            j++;
            i++;
            this.x += letterWidth;
            
            if (i === this.string.length) {
                console.log("object");
                ctx.drawImage(this.img, 600, 600, 200, 200);

                clearInterval(typeText);
            }
        }, speed);
    }
    updateTitle() {
        ctx.font = "40px Arial";
        ctx.fillText(this.string, this.x, this.y);
    }
}
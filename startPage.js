let gameStory = " THEY lost their mom in an accident last year. "
// they went through a depression phase afterward right when they were exploring their gender identity and concerns as well. They asked for an unpaid leave of their job and for long time stayed in bed doing nothing except watching random videos on youtube, eating frozen pizzas and drinking a lot. Now they started to feel better again. They go to therapy and need to watch their both mental and physical health out. They want to bring balance in their life again and get the social life they had back. with working 8 hours per day, attending to events they like, meeting friends and the loved ones, going to gym and eating healthy, good food. It’s not that easy though, but they believe that they could do it. Would you help them on this journey? "



// creat text class for writing on canvas
class text {
    constructor(string, x, y, lineHeight) {
        this.string = string;
        this.x = x;
        this.x1 = 0;
        this.y = y;
        this.lineHeight = lineHeight;
        this.lineStartX = x;
        this.img = new Image();
        this.string2 = "Press Enter to  start the game"
    }
    // method to write it on the canvas letter by latter
    update(speed) {
        // declare an i counter to get the index of the letters from the string
        let i = -30;
        // declare an j counter to start writing on the canvas
        let j = 0;
        // 
        let f = 0;
        let typeText = setInterval(() => {
            // to get the width of each letter by using measureText 
            //which returns an object that contains the width of the specified text, in pixels
            let letterWidth2 = ctx.measureText(this.string2.charAt(f)).width;
            let letterWidth = ctx.measureText(this.string.charAt(i)).width;
            // To not write out of the canvas width + margin to move to the next line 
            if (this.x + letterWidth >= canvas.width - this.lineStartX) {
                this.x = this.lineStartX;
                this.y += this.lineHeight;
            }
            // To start writing the text letter by letter after  30
            if (j >= 30) {
                ctx.fillStyle = "#B1B3B3FF"
                ctx.font = "20px Arial";
                ctx.fillText(this.string.charAt(i), this.x, this.y);
            }
            // to write the command to start the game after writing the story
            // if (j >= this.string.length + 30) {
            //     f = j - this.string.length - 30
            //     ctx.fillText(this.string2.charAt(f), this.x1, 500);
            // }
            j++;
            i++;
            // f++
            // move the x by the width of the letter after writing it
            this.x += letterWidth;
            this.x1 += letterWidth2;
            if (i === this.string.length) {
                clearInterval(typeText);
            }
        }, speed);
    }




}
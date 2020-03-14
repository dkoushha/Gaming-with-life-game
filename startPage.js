let texty = 'lorem ipsum dolor et sit amet...lorem ipsum dolor et sit amet...lorem ipsum dolor et sit amet lorem ipsum dolor et sit amet...lorem ipsum dolor et sit amet...';

// let canvas = document.getElementById("canvas");
// let ctx = document.getElementById("canvas").getContext("2d");

class text {
    constructor(string, x, y, lineHeight) {
        this.string = string;
        this.x = x;
        this.y = y;
        this.lineHeight = lineHeight;
        this.lineStartX = x;
    }
    update(speed) {
        let i = -50
        let j = 0
        let typeText = setInterval(() => {
            let letterWidth = ctx.measureText(this.string.charAt(i)).width;
            if (this.x + letterWidth >= canvas.width - this.lineStartX) {
                this.x = this.lineStartX
                this.y += this.lineHeight;
            }
            if (j >= 50) {
                ctx.font = "40px Arial"
                ctx.fillText(this.string.charAt(i), this.x, this.y)
            }
            j++
            i++
            this.x += letterWidth;
            if (i === this.string.length) {
                clearInterval(typeText)
            }
        }, speed)
    }
}
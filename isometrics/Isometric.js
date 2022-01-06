// var baseX = window.innerWidth / 2;
// var baseY = window.innerHeight / 10;


// var baseX = 1000;
// var baseY = 0;

class Isometric{
    constructor(graphics, baseX, baseY){
        this.graphics = graphics; //Load context

        this.baseX = baseX;
        this.baseY = baseY;

        this.tilePos1 = [0, 0];
        this.tilePos2 = [0, 0];
        this.tilePos3 = [0, 0];
        this.tilePos4 = [0, 0];

        this.intialized = true;
    }
    initPattern = (sprite, context) => {
        var img = new Image();
        img.src = `./isometrics/sprite/${sprite}.png`;
        img.onload = function () {
            var pattern = context.createPattern(img, 'repeat');
            context.fillStyle = pattern;
        }
        
    }
    tileSkull = (initX, initY, height, color, spritePattern) => {
        let y = this.baseY + ((initY + initX - height) * TILE_DIAGONAL_Y / 2);
        let x = this.baseX + (initX * TILE_DIAGONAL_X / 2) - (initY * TILE_DIAGONAL_X / 2);

        
        if (spritePattern && !color) {
            
            // this.initPattern(sprite, this.graphics)
            
            // var img = new Image();
            // img.src = `./isometrics/sprite/${sprite}.png`;
            // var pattern = this.graphics.createPattern(img, 'repeat');
            this.graphics.fillStyle = spritePattern;
            
            // img.onload = () => {
            //     console.log(that.graphics)
            //     var pattern = that.graphics.createPattern(img, 'repeat');
            //     that.graphics.fillStyle = pattern;
            //     console.log("fffffff")
            // }

            console.log("dddd")
            
        }
        if (color && !spritePattern) {
            this.graphics.fillStyle = color;
        }
        this.graphics.setLineDash([2]);
        this.graphics.beginPath();
        this.graphics.moveTo(x + TILE_DIAGONAL_X / 2, y);
        this.graphics.lineTo(x + TILE_DIAGONAL_X, y + TILE_DIAGONAL_Y / 2);
        this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y + TILE_DIAGONAL_Y);
        this.graphics.lineTo(x , y + TILE_DIAGONAL_Y / 2);
        this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y);
        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.stroke();

        // this.graphics.fillStyle = color;
        // this.graphics.setLineDash([2]);
        // this.graphics.beginPath();
        // this.graphics.moveTo(x + TILE_DIAGONAL_X / 2, y);
        // this.graphics.lineTo(x + TILE_DIAGONAL_X, y + TILE_DIAGONAL_Y / 2);
        // this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y + TILE_DIAGONAL_Y);
        // this.graphics.lineTo(x , y + TILE_DIAGONAL_Y / 2);
        // this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y);
        // this.graphics.closePath();
        // this.graphics.fill();
        // this.graphics.stroke();


        this.tilePos1 = [x + TILE_DIAGONAL_X / 2, y];
        this.tilePos2 = [x + TILE_DIAGONAL_X, y + TILE_DIAGONAL_Y / 2];
        this.tilePos3 = [x + TILE_DIAGONAL_X / 2, y + TILE_DIAGONAL_Y];
        this.tilePos4 = [x, y + TILE_DIAGONAL_Y / 2];
    }

    tileBorder = (initX, initY, height, color, sprite, tileOnRight, tileOnLeft) => {
        let y = this.baseY + ((initY + initX - height) * TILE_DIAGONAL_Y / 2);
        let x = this.baseX + (initX * TILE_DIAGONAL_X / 2) - (initY * TILE_DIAGONAL_X / 2);
        this.graphics.fillStyle = color;
        this.graphics.setLineDash([2]);

        if (tileOnLeft) {
            this.graphics.beginPath();
            this.graphics.moveTo(x, y + TILE_DIAGONAL_Y / 2);
            this.graphics.lineTo(x, y + TILE_DIAGONAL_Y);
            this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y + TILE_DIAGONAL_Y / 2 * 3);
            this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y + TILE_DIAGONAL_Y);
            this.graphics.lineTo(x, y + TILE_DIAGONAL_Y / 2);
            this.graphics.closePath();
            this.graphics.fill();
            this.graphics.stroke();
        }

        if (tileOnRight) {
            this.graphics.beginPath();
            this.graphics.moveTo(x + TILE_DIAGONAL_X / 2 ,y + TILE_DIAGONAL_Y);
            this.graphics.lineTo(x + TILE_DIAGONAL_X, y + TILE_DIAGONAL_Y / 2);
            this.graphics.lineTo(x + TILE_DIAGONAL_X, y + TILE_DIAGONAL_Y);
            this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y + TILE_DIAGONAL_Y / 2 * 3);
            this.graphics.closePath();
            this.graphics.fill();
            this.graphics.stroke();
        }

        
    }

    montainSkull = (x, y , color, height) => {
        this.graphics.fillStyle = color;
        this.graphics.beginPath();
        this.graphics.moveTo(x + TILE_DIAGONAL_X / 2, y - 16);
        this.graphics.lineTo(x + TILE_DIAGONAL_X, y);
        this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y + 16);
        this.graphics.lineTo(x , y);
        this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y - 16);
        this.graphics.lineTo(x, y);
        this.graphics.lineTo(x +TILE_DIAGONAL_X / 2, y - 16 * height);
        this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y - 16);
        this.graphics.lineTo(x + TILE_DIAGONAL_X / 2, y - 16 * height);
        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.stroke();
    }

    

    drawTile(isoPoint, texture, float, tileOnRight, tileOnLeft, tileColor, tileBorderColor, tileSprite, tileBorderSprite){

        if (float || isoPoint.height == 0) {
            this.tileSkull(isoPoint.x, isoPoint.y, isoPoint.height, tileColor, tileSprite);
            this.tileBorder(isoPoint.x, isoPoint.y, isoPoint.height, tileBorderColor, tileBorderSprite, tileOnRight, tileOnLeft);
        } 
        // else {
        //     if (texture != "water")
        //         for (let i = 0; i <= isoPoint.height; i++) {
        //             this.tileSkull(isoPoint.x, isoPoint.y, i, materials[texture][0]);
        //             this.tileBorder(isoPoint.x, isoPoint.y, i, materials[texture][1]);
        //         }
        //     if (texture == "water")
        //         for (let i = isoPoint.height; i <= 0; i++) {
        //             if (i == 0)
        //                 this.tileSkull(isoPoint.x, isoPoint.y, i, materials[texture][0]);
        //             this.tileBorder(isoPoint.x, isoPoint.y, i, materials[texture][1], tileOnRight, tileOnLeft);
        //         }
        // }
    }

    drawMontain(isoPoint, color, height){
        this.graphics.fillStyle = color;
        this.montainSkull(isoPoint.x, isoPoint.y, color, height);
        this.graphics.fillStyle = color;
        this.tileBorder(isoPoint.x, isoPoint.y, color);
    }

    drawSprite(isoPoint,  sprite){
        // let y = this.baseY + ((isoPoint.y + isoPoint.x - isoPoint.height) * 16) - 32 + 8;
        // let x = (this.baseX + (isoPoint.x * 32) - (isoPoint.y * 32));
        // var sprt = new Image();
        // sprt.src = "isometrics/sprite/" + sprite + ".png";
        // this.graphics.drawImage(sprt, x, y, 64,64);

        var sprt = new Image();
        sprt.src = `./isometrics/sprite/${sprite}.png`;
        canvas.graphics.transform(1, 0, 0, 0.5, 0, 0);
        canvas.graphics.drawImage(sprt, 350, 300, TILE_DIAGONAL_X, TILE_DIAGONAL_X)
    }
}
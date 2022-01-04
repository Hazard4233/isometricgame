var baseX = window.innerWidth / 2;
var baseY = window.innerHeight / 2;

class Isometric{
    constructor(graphics){
        this.graphics = graphics; //Load context
        
        this.hoverTileColor = '#FFEE58';
        this.activeTileColor = '#FF9800';
        this.tilePos1 = [0, 0];
        this.tilePos2 = [0, 0];
        this.tilePos3 = [0, 0];
        this.tilePos4 = [0, 0];

        this.intialized = true;
    }
    tileSkull = (initX, initY, height, color) => {
        let y = baseY + ((initY + initX - height) * 16);
        let x = baseX + (initX * 32) - (initY * 32);

        this.graphics.fillStyle = color;
        this.graphics.setLineDash([2]);
        this.graphics.beginPath();
        this.graphics.moveTo(x + 32, y);
        this.graphics.lineTo(x + 64, y + 16);
        this.graphics.lineTo(x + 32, y + 32);
        this.graphics.lineTo(x , y + 16);
        // this.graphics.lineTo(x + 32, y);
        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.stroke();

        this.tilePos1 = [x + 32, y];
        this.tilePos2 = [x + 64, y + 16];
        this.tilePos3 = [x + 32, y + 32];
        this.tilePos4 = [x, y + 16];
    }

    tileBorder = (initX, initY, height, color, tileOnRight = false, tileOnLeft = false) => {
        let y = baseY + ((initY + initX - height) * 16);
        let x = baseX + (initX * 32) - (initY * 32);
        this.graphics.fillStyle = color;
        this.graphics.setLineDash([2]);

        if (!tileOnLeft) {
            this.graphics.beginPath();
            this.graphics.moveTo(x, y + 16);
            this.graphics.lineTo(x, y + 32);
            this.graphics.lineTo(x + 32, y + 48);
            this.graphics.lineTo(x + 32, y + 32);
            this.graphics.lineTo(x, y + 16);
            this.graphics.closePath();
            this.graphics.fill();
            this.graphics.stroke();
        }

        if (!tileOnRight) {
            this.graphics.beginPath();
            this.graphics.moveTo(x + 32 ,y + 32);
            this.graphics.lineTo(x +  64, y + 16);
            this.graphics.lineTo(x +  64, y + 32);
            this.graphics.lineTo(x + 32, y + 48);
            this.graphics.closePath();
            this.graphics.fill();
            this.graphics.stroke();
        }
    }

    montainSkull = (x, y , color, height) => {
        this.graphics.fillStyle = color;
        this.graphics.beginPath();
        this.graphics.moveTo(x + 32, y - 16);
        this.graphics.lineTo(x + 64, y);
        this.graphics.lineTo(x + 32, y + 16);
        this.graphics.lineTo(x , y);
        this.graphics.lineTo(x + 32, y - 16);
        this.graphics.lineTo(x, y);
        this.graphics.lineTo(x +32, y - 16 * height);
        this.graphics.lineTo(x +32, y - 16);
        this.graphics.lineTo(x + 32, y - 16 * height);
        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.stroke();
    }

    

    drawTile(isoPoint, texture, float, tileOnRight, tileOnLeft, selected, hovered){

        if (float || isoPoint.height == 0) {
            this.tileSkull(isoPoint.x, isoPoint.y, isoPoint.height, selected ? this.activeTileColor : materials[texture][0]);
            this.tileBorder(isoPoint.x, isoPoint.y, isoPoint.height, selected ? this.activeTileColor : materials[texture][1]);
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
        let y = baseY + ((isoPoint.y + isoPoint.x - isoPoint.height) * 16) - 32 + 8;
        let x = (baseX + (isoPoint.x * 32) - (isoPoint.y * 32));
        var sprt = new Image();
        sprt.src = "isometrics/sprite/" + sprite + ".png";
        this.graphics.drawImage(sprt, x, y, 64,64);
    }
}
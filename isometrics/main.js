var canvasEle = document.getElementById('canvas');
var canvas = new Canvas(canvasEle);

var map = [];
var isometric
var isometricList = [];
var selectedTile = {
    id: "",
    idxRow: -1,
    idxCol: -1
};
var hoveredTile = {
    id: "",
    idxRow: -2,
    idxCol: -2
}    

var patternList = []

window.onload = function () {
    
    var materials = ['grass', 'rock1', 'rock2', 'rock3'];
    for (let index = 0; index < materials.length; index++) {
        var img = new Image();
        img.src = `./isometrics/sprite/${item}.png`;
        var pattern = canvas.graphics.createPattern(img, 'repeat');
        // canvas.graphics.fillStyle = grassPattern;
        patternList.push(pattern)
    }
    
    setTimeout(() => {
        initCanvas()
    }, 100);
    
}


function clickTile(evt) {
    var x = evt.x + document.querySelector(".canvas-div").scrollLeft;
    var y = evt.y + document.querySelector(".canvas-div").scrollTop;
    
    var result = isometricList.filter(item => {
        if (detectPosInTile([x, y], item.pos1, item.pos2, item.pos3, item.pos4)) {
            item.selected = true;
            return item;
        }
    })

    if (selectedTile.id !== "") {
        var texture = new IsometricTexturize(map[selectedTile.idxCol][selectedTile.idxRow]);
        isometric.drawTile(
            new IsomtericPoint(selectedTile.idxRow, selectedTile.idxCol, texture.getHeight()),
            texture.getTexture(),
            false,
            selectedTile.idxRow === map[selectedTile.idxCol].length - 1 ? true : false, // tileOnRight
            selectedTile.idxCol + 1 >= map.length ? true : false, // tileOnLeft
            null, // tileColor
            materials[texture.getTexture()][1], // tileBorderColor
            texture.getTexture(),
            null
        );
    }
    
    if (result.length !== 0) {
        var texture = new IsometricTexturize(map[result[0].idxCol][result[0].idxRow]);
        isometric.drawTile(
            new IsomtericPoint(result[0].idxRow, result[0].idxCol, texture.getHeight()),
            texture.getTexture(),
            false,
            result[0].idxRow === map[result[0].idxCol].length - 1 ? true : false, // tileOnRight
            result[0].idxCol + 1 >= map.length ? true : false, // tileOnLeft
            CLICK_TILE_COLOR, // tileColor
            CLICK_TILE_COLOR, // tile
            null, // tileSprite
            null, // tileBorderSprite 
            
        );
        selectedTile.id = result[0].id
        selectedTile.idxRow = result[0].idxRow;
        selectedTile.idxCol = result[0].idxCol;
    }
}


function hoverTile(evt) {
    var x = evt.x + document.querySelector(".canvas-div").scrollLeft;
    var y = evt.y + document.querySelector(".canvas-div").scrollTop;
    
    var result = isometricList.filter(item => {
        if (detectPosInTile([x, y], item.pos1, item.pos2, item.pos3, item.pos4)) {
            return item;
        }
    })
    if (result.length !== 0) {
        if (hoveredTile.id !== "" && hoveredTile.id !== selectedTile.id) {
            // change highlight tile into origin color
            var texture = new IsometricTexturize(map[hoveredTile.idxCol][hoveredTile.idxRow]);
            isometric.drawTile(
                new IsomtericPoint(hoveredTile.idxRow, hoveredTile.idxCol, texture.getHeight()), // isoPoint
                texture.getTexture(), // texture
                false, // float
                hoveredTile.idxRow === map[result[0].idxCol].length - 1 ? true : false, // tileOnRight
                hoveredTile.idxCol + 1 == map.length ? true : false, // tileOnLeft
                null, // tileColor
                materials[texture.getTexture()][1], // tileBorderColor
                texture.getTexture(), // tileSprite
                null // tileBorderSprite
            );
        }
        
        if (selectedTile.id !== result[0].id) {
            // tile highlight
            var texture = new IsometricTexturize(map[result[0].idxCol][result[0].idxRow]);
            isometric.drawTile(
                new IsomtericPoint(result[0].idxRow, result[0].idxCol, texture.getHeight()), // isoPoint
                texture.getTexture(), // texture
                false, // float
                result[0].idxRow === map[result[0].idxCol].length - 1 ? true : false, // tileOnRight
                result[0].idxCol + 1 >= map.length ? true : false, // tileOnLeft
                HOVER_TILE_COLOR, // tileColor
                HOVER_TILE_COLOR, // tileBorderColor
                null, // tileSprite
                null // tileBorderSprite
            );
        }
        
        hoveredTile.id = result[0].id;
        hoveredTile.idxRow = result[0].idxRow;
        hoveredTile.idxCol = result[0].idxCol;
    }
}

function resizeCanvas() {
    initCanvas()
}



function initCanvas() {

    // format variable
    map = [];
    isometricList = [];
    selectedTile = {
        id: "",
        idxRow: -1,
        idxCol: -1
    };
    hoveredTile = {
        id: "",
        idxRow: -2,
        idxCol: -2
    }  
    
    // get column and row numbers
    var numCols = Number(document.getElementById('num-cols').value);
    var numRows = Number(document.getElementById('num-rows').value);
    var numRock1 = Number(document.getElementById('num-rock1').value);
    var numRock2 = Number(document.getElementById('num-rock2').value);
    var numRock3 = Number(document.getElementById('num-rock3').value);
    if (numCols === 0 || numRows === 0) {
        window.alert("Please insert number of columns and rows.");
        return
    }

    // init canvas
    canvas.size(
        64 * (numCols && numRows) > document.documentElement.clientWidth ? 64 * (numCols && numRows) + 200 : document.documentElement.clientWidth, 
        64 * (numCols && numRows) * 0.7 > document.documentElement.clientWidth ? 64 * (numCols && numRows) * 0.7 : document.documentElement.clientWidth,
    );
    canvas.background('skyblue');
    
    canvas.graphics.setTransform(1, 0, 0, 1, 0, 0)
    
    isometric = new Isometric(canvas.graphics, baseX = canvasEle.clientWidth / 2, baseY = 150);

    // map = Array(numCols).fill(Array(numRows).fill("grass:0"))
    for (let i = 0; i < numCols; i++) {
        var arrayVar = [];
        for (let j = 0; j < numRows; j++) {
            arrayVar.push('grass:0');
        }
        map.push(arrayVar)
    }

    for (let i = 0; i < numRock1; i++) {
        var randomNumCol = Math.floor(Math.random() * (numCols - 1));
        var randomNumRow = Math.floor(Math.random() * (numRows - 1));
        map[randomNumCol][randomNumRow] = `rock1:0`
    }
    for (let i = 0; i < numRock2; i++) {
        var randomNumCol = Math.floor(Math.random() * (numCols - 1));
        var randomNumRow = Math.floor(Math.random() * (numRows - 1));
        map[randomNumCol][randomNumRow] = `rock2:0`
    }
    for (let i = 0; i < numRock3; i++) {
        var randomNumCol = Math.floor(Math.random() * (numCols - 1));
        var randomNumRow = Math.floor(Math.random() * (numRows - 1));
        map[randomNumCol][randomNumRow] = `rock3:0`
    }
    


    for(let idxCol = 0; idxCol < map.length; idxCol++){
        for(let idxRow = 0; idxRow < map[idxCol].length; idxRow++){
            if (map[idxCol][idxRow] != null) {
                var texture = new IsometricTexturize(map[idxCol][idxRow]);
                isometric.drawTile(
                    new IsomtericPoint(idxRow, idxCol, texture.getHeight()), // isoPoint
                    texture.getTexture(), // texture
                    false, // float
                    true, // tileOnRight
                    true, // tileOnLeft
                    null, // tileColor
                    materials[texture.getTexture()][1], // tileBorderColor
                    texture.getTexture(),
                    null // tileBorderSprite
                );

                // isometric.drawSprite(
                //     new IsomtericPoint(idxRow, idxCol, texture.getHeight()),
                //     'grass'
                // )

                isometricList.push({
                    id: generateUUID(),
                    idxRow: idxRow,
                    idxCol: idxCol,
                    pos1: isometric.tilePos1,
                    pos2: isometric.tilePos2,
                    pos3: isometric.tilePos3,
                    pos4: isometric.tilePos4,
                    selected: false,
                    hovered: false
                })
            }
        }
    }

}

canvasEle.addEventListener('mouseup', (evt) => clickTile(evt))

canvasEle.addEventListener('mousemove', (evt) => hoverTile(evt))

window.addEventListener('resize', resizeCanvas, false)

document.getElementById("create-btn").addEventListener('click', () => {
    initCanvas()
})


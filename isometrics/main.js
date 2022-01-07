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
var patternList = [];



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded")
    setTimeout(() => {
        initMap()    
    }, 300);
})

window.onload = function () {
    console.log("window onload")
    // initMap()
}


// function preload() {
//     for (i = 0; i < preload.arguments.length; i++) {
//         images[i] = new Image()
//         images[i].src = preload.arguments[i]
//     }
// }


function initSpritePattern() {
    for (let idx = 0; idx < images.length; idx++) {
        var pattern = canvas.graphics.createPattern(images[idx], 'repeat');
        patternList.push({
            type: SPRITE_LIST[idx],
            pattern: pattern
        })
    }
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
        var pattern = patternList.filter(item => String(map[selectedTile.idxCol][selectedTile.idxRow]).includes(item.type))
        isometric.drawTile(
            new IsomtericPoint(selectedTile.idxRow, selectedTile.idxCol, texture.getHeight()),
            selectedTile.idxRow === map[selectedTile.idxCol].length - 1 ? true : false, // tileOnRight
            selectedTile.idxCol + 1 >= map.length ? true : false, // tileOnLeft
            null, // tileColor
            materials[texture.getTexture()][1], // tileBorderColor
            pattern[0].pattern, // 
            null
        );
    }
    
    if (result.length !== 0) {
        var texture = new IsometricTexturize(map[result[0].idxCol][result[0].idxRow]);
        isometric.drawTile(
            new IsomtericPoint(result[0].idxRow, result[0].idxCol, texture.getHeight()),
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
            var pattern = patternList.filter(item => String(map[hoveredTile.idxCol][hoveredTile.idxRow]).includes(item.type))
            isometric.drawTile(
                new IsomtericPoint(hoveredTile.idxRow, hoveredTile.idxCol, texture.getHeight()), // isoPoint
                hoveredTile.idxRow === map[result[0].idxCol].length - 1 ? true : false, // tileOnRight
                hoveredTile.idxCol + 1 == map.length ? true : false, // tileOnLeft
                null, // tileColor
                materials[texture.getTexture()][1], // tileBorderColor
                // texture.getTexture(), // tileSprite
                pattern[0].pattern,
                null // tileBorderSprite
            );
        }
        
        if (selectedTile.id !== result[0].id) {
            // tile highlight
            var texture = new IsometricTexturize(map[result[0].idxCol][result[0].idxRow]);
            isometric.drawTile(
                new IsomtericPoint(result[0].idxRow, result[0].idxCol, texture.getHeight()), // isoPoint
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
    setTimeout(() => {
        initMap()    
    }, 100);
}



function initMap() {
    initCanvas()
    isometric = new Isometric(canvas.graphics, baseX = canvasEle.clientWidth / 2, baseY = 150);

    for(let idxCol = 0; idxCol < map.length; idxCol++){
        for(let idxRow = 0; idxRow < map[idxCol].length; idxRow++){
            if (map[idxCol][idxRow] != null) {
                var texture = new IsometricTexturize(map[idxCol][idxRow]);
                var pattern = patternList.filter(item => String(map[idxCol][idxRow]).includes(item.type))
                isometric.drawTile(
                    new IsomtericPoint(idxRow, idxCol, texture.getHeight()), // isoPoint
                    true, // tileOnRight
                    true, // tileOnLeft
                    null, // tileColor
                    materials[texture.getTexture()][1], // tileBorderColor
                    pattern[0].pattern,
                    null // tileBorderSprite
                );

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

    for (let i = 0; i < numCols; i++) {
        var arrayVar = [];
        for (let j = 0; j < numRows; j++) arrayVar.push('grass:0');
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

    // init canvas
    canvas.size(
        TILE_DIAGONAL_X * (numCols || numRows) > document.documentElement.clientWidth ? TILE_DIAGONAL_X * (numCols || numRows) + 200 : document.documentElement.clientWidth, 
        TILE_DIAGONAL_X * (numCols || numRows) * 0.7 > document.documentElement.clientWidth ? TILE_DIAGONAL_X * (numCols || numRows) * 0.7 : document.documentElement.clientWidth,
    );
    canvas.background('skyblue');
    initSpritePattern(canvas.graphics)
}

canvasEle.addEventListener('mouseup', (evt) => clickTile(evt))

canvasEle.addEventListener('mousemove', (evt) => hoverTile(evt))

window.addEventListener('resize', resizeCanvas, false)

document.getElementById("create-btn").addEventListener('click', () => {
    setTimeout(() => {
        initMap()    
    }, 100);
})


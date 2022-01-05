var canvasEle = document.getElementById('canvas');
var canvas = new Canvas(canvasEle);

var map = [];
var isometric
var isometricList = [];
var selectedTile = {
    id: "",
    idx_x: -1,
    idx_y: -1
};
var hoveredTile = {
    id: "",
    idx_x: -2,
    idx_y: -2
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
        var texture = new IsometricTexturize(map[selectedTile.idx_y][selectedTile.idx_x]);
        isometric.drawTile(
            new IsomtericPoint(selectedTile.idx_x, selectedTile.idx_y, texture.getHeight()),
            texture.getTexture(),
            false,
            selectedTile.idx_x != map[selectedTile.idx_y].length && map[selectedTile.idx_y][selectedTile.idx_x+1] ==  map[selectedTile.idx_y][selectedTile.idx_x] ? false  : true,
            selectedTile.idx_y + 1 >= map.length  ? false : true,
            false,
            false,
            false
        );
    }
    
    if (result.length !== 0) {
        var texture = new IsometricTexturize(map[result[0].idx_y][result[0].idx_x]);
        isometric.drawTile(
            new IsomtericPoint(result[0].idx_x, result[0].idx_y, texture.getHeight()),
            texture.getTexture(),
            false,
            result[0].idx_x != map[result[0].idx_y].length && map[result[0].idx_y][result[0].idx_x+1] ==  map[result[0].idx_y][result[0].idx_x] ? false  : true,
            result[0].idx_y + 1 >= map.length  ? false : true,
            true,
            false,
            
        );
        selectedTile.id = result[0].id
        selectedTile.idx_x = result[0].idx_x;
        selectedTile.idx_y = result[0].idx_y;
    }
}


function hoverTile(evt) {
    // console.log(document.getElementsByTagName('canvas')[0].scrollTop)
    // console.log(document.body.scrollTop)
    var x = evt.x + document.querySelector(".canvas-div").scrollLeft;
    var y = evt.y + document.querySelector(".canvas-div").scrollTop;
    
    var result = isometricList.filter(item => {
        if (detectPosInTile([x, y], item.pos1, item.pos2, item.pos3, item.pos4)) {
            item.hovered = true;
            return item;
        }
    })
    if (result.length !== 0) {
        if (hoveredTile.id !== "" && hoveredTile.id !== selectedTile.id) {
            // change highlight tile into origin color
            var texture = new IsometricTexturize(map[hoveredTile.idx_y][hoveredTile.idx_x]);
            isometric.drawTile(
                new IsomtericPoint(hoveredTile.idx_x, hoveredTile.idx_y, texture.getHeight()),
                texture.getTexture(),
                false,
                hoveredTile.idx_x != map[hoveredTile.idx_y].length && map[hoveredTile.idx_y][hoveredTile.idx_x+1] ==  map[hoveredTile.idx_y][hoveredTile.idx_x] ? false  : true,
                hoveredTile.idx_y + 1 >= map.length  ? false : true,
                false,
                false,
                false
            );
        }
        
        if (selectedTile.id !== result[0].id) {
            // tile highlight
            var texture = new IsometricTexturize(map[result[0].idx_y][result[0].idx_x]);
            isometric.drawTile(
                new IsomtericPoint(result[0].idx_x, result[0].idx_y, texture.getHeight()),
                texture.getTexture(),
                false,
                result[0].idx_x != map[result[0].idx_y].length && map[result[0].idx_y][result[0].idx_x+1] ==  map[result[0].idx_y][result[0].idx_x] ? false  : true,
                result[0].idx_y + 1 >= map.length  ? false : true,
                false,
                true,
                false
            );
        }
        
        hoveredTile.id = result[0].id;
        hoveredTile.idx_x = result[0].idx_x;
        hoveredTile.idx_y = result[0].idx_y;
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
        idx_x: -1,
        idx_y: -1
    };
    hoveredTile = {
        id: "",
        idx_x: -2,
        idx_y: -2
    }  
    
    // get column and row numbers
    var numCols = Number(document.getElementById('num-cols').value);
    var numRows = Number(document.getElementById('num-rows').value);
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

    
    isometric = new Isometric(canvas.graphics, baseX = canvasEle.clientWidth / 2, baseY = 150);
    
    map = Array(numCols).fill(Array(numRows).fill("grass:0"))
    


    for(let idx_y = 0; idx_y < map.length; idx_y++){
        for(let idx_x = 0; idx_x < map[idx_y].length; idx_x++){
            if (map[idx_y][idx_x] != null) {
                var texture = new IsometricTexturize(map[idx_y][idx_x]);
                isometric.drawTile(
                    new IsomtericPoint(idx_x, idx_y, texture.getHeight()),
                    texture.getTexture(),
                    false,
                    idx_x != map[idx_y].length && map[idx_y][idx_x+1] ==  map[idx_y][idx_x] ? true  : false,
                    idx_y + 1 >= map.length  ? false : true,
                    false,
                    false,
                    true
                );
                isometricList.push({
                    id: generateUUID(),
                    idx_x: idx_x,
                    idx_y: idx_y,
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
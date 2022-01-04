var canvasEle = document.getElementById('canvas');
var canvas = new Canvas(canvasEle);
canvas.size(window.innerWidth,window.innerHeight);
canvas.background('skyblue');

var isometric = new Isometric(canvas.graphics);
var isometricList = [];
var selectedTile = {
    idx_x: -1,
    idx_y: -1
};    

for(let idx_y = 0; idx_y < map.length; idx_y++){
    for(let idx_x = 0; idx_x < map[idx_y].length; idx_x++){
        if (map[idx_y][idx_x] != null) {
            var texture = new IsometricTexturize(map[idx_y][idx_x]);
            isometric.drawTile(
                new IsomtericPoint(idx_x, idx_y, texture.getHeight()),
                texture.getTexture(),
                false,
                idx_x != map[idx_y].length && map[idx_y][idx_x+1] ==  map[idx_y][idx_x] ? false  : true,
                idx_y + 1 >= map.length  ? false : true,
                false,
                false
            );
            isometricList.push({
                id: generateUUID(),
                idx_x: idx_x,
                idx_y: idx_y,
                pos1: isometric.tilePos1,
                pos2: isometric.tilePos2,
                pos3: isometric.tilePos3,
                pos4: isometric.tilePos4,
                selected: false
            })
        }
    }
}


canvasEle.addEventListener('mouseup', (evt) => {
    var x = evt.x - canvasEle.offsetLeft;
    var y = evt.y - canvasEle.offsetTop;
    if (selectedTile.idx_x >= 0 && selectedTile.idx_y >= 0) {
        var texture = new IsometricTexturize(map[selectedTile.idx_y][selectedTile.idx_x]);
        isometric.drawTile(
            new IsomtericPoint(selectedTile.idx_x, selectedTile.idx_y, texture.getHeight()),
            texture.getTexture(),
            false,
            selectedTile.idx_x != map[selectedTile.idx_y].length && map[selectedTile.idx_y][selectedTile.idx_x+1] ==  map[selectedTile.idx_y][selectedTile.idx_x] ? false  : true,
            selectedTile.idx_y + 1 >= map.length  ? false : true,
            false,
            false
        );
    }
    var result = isometricList.filter(item => {
        if (detectPosInTile([x, y], item.pos1, item.pos2, item.pos3, item.pos4)) {
            item.selected = true;
            return item;
        }
    })
    
    if (result.length !== 0) {
        var texture = new IsometricTexturize(map[result[0].idx_y][result[0].idx_x]);
        isometric.drawTile(
            new IsomtericPoint(result[0].idx_x, result[0].idx_y, texture.getHeight()),
            texture.getTexture(),
            false,
            result[0].idx_x != map[result[0].idx_y].length && map[result[0].idx_y][result[0].idx_x+1] ==  map[result[0].idx_y][result[0].idx_x] ? false  : true,
            result[0].idx_y + 1 >= map.length  ? false : true,
            true,
            false
        );
        selectedTile.idx_x = result[0].idx_x;
        selectedTile.idx_y = result[0].idx_y;
    }

})
canvasEle.addEventListener('mousemove', (evt) => {
    var x = evt.x - canvasEle.offsetLeft;
    var y = evt.y - canvasEle.offsetTop;
    // console.log("x=", x)
})

// isometric.drawSprite(new IsomtericPoint(1, 1, 4), "trees");
// isometric.drawTile(
//     new IsomtericPoint(0, 0, new IsometricTexturize(map[0][0]).getHeight()),
//     new IsometricTexturize(map[0][0]).getTexture(),
//     false,
//     false,
//     false
// )

// isometric.drawTile(
//     new IsomtericPoint(0, 1, new IsometricTexturize(map[0][0]).getHeight()),
//     new IsometricTexturize(map[0][0]).getTexture(),
//     false,
//     false,
//     false
// )

var materials = {
    'grass': ["#289517", "#4e4220"],
    'rock1': ["#4e4e4e", "#2f3542"],
    'rock2': ["#a3a3a3", "#a3a3a3"],
    'rock3': ["#d0d0d0", "#d0d0d0"],
}


// function initSpritePattern(context) {
//     var patternList = []
//     for (let idx = 0; idx < SPRITE_LIST.length; idx++) {
//         var img = new Image();
//         img.src = `./isometrics/sprite/${SPRITE_LIST[idx]}.png`;
//         var pattern = context.createPattern(img, 'repeat');
//         patternList.push({
//             type: SPRITE_LIST[idx],
//             pattern: pattern
//         })
//     }
//     return patternList;
// }

var images = [];

function preloadImg() {
    for (let idx = 0; idx < preloadImg.arguments.length; idx++) {
        var img = new Image()
        img.src = `./isometrics/sprite/${preloadImg.arguments[idx]}.png`;
        images.push(img)
    }
}
preloadImg(
    "grass",
    "rock1",
    "rock2",
    "rock3"
)
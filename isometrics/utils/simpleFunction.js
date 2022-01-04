function generateUUID() {
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function detectPosInTile(mousePos, pos1, pos2, pos3, pos4) {
    // mousePos = [x, y] : mouse position
    // pos1, pos2, pos3, pos4 = [x, y] : vertex's coordinate of rectangle tile
    // line1, line2, line3, line4: y = a1 * x + b1, y = a2 * x + b2, y = a3 * x + b3, y = a4 * x + b4
    
    var returnVal = false;

    // line1
    let a1 = (pos4[1] - pos1[1]) / (pos4[0] - pos1[0]);
    let b1 = pos1[1] - a1 * pos1[0];

    // line2
    let a2 = (pos2[1] - pos1[1]) / (pos2[0] - pos1[0]);
    let b2 = pos1[1] - a2 * pos1[0];
    
    // line3
    let a3 = (pos3[1] - pos2[1]) / (pos3[0] - pos2[0]);
    let b3 = pos3[1] - a3 * pos3[0];
    
    // line4
    let a4 = (pos4[1] - pos3[1]) / (pos4[0] - pos3[0]);
    let b4 = pos4[1] - a4 * pos4[0];

    // console.log(`a1=${a1}, b1=${b1}`)
    // console.log(`mousePos=${mousePos}`)
    
    if ( mousePos[1] > a1 * mousePos[0] + b1 && 
        mousePos[1] > a2 * mousePos[0] + b2 && 
        mousePos[1] < a3 * mousePos[0] + b3 &&
        mousePos[1] < a4 * mousePos[0] + b4) {
            returnVal = true;
    }
    // console.log("dd=", mousePos[1] < a4 * mousePos[0] + b4)
    return returnVal;
}
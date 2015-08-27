var blockInput = false;
var rolling = true;

var leadingZeroes = 5;
var pins = "135797531";
var trailingZeroes = 56;

function start(){
    readOnly(false);
    blockInput = false;
    refillBox();
}

function keyDown(event){
    if (blockInput || event.keyCode !== 8){
        refillBox();
        return;
    }
    rolling = true;
}

function keyUp(event){
    if (blockInput || !rolling || event.keyCode !== 8){
        refillBox();
        return;
    }
    var result = document.getElementById('bowling').value;
    alert(score(result));
    refillBox();
    rolling = false;
}

function readOnly(tf){
    document.getElementById('bowling').readOnly = tf;
}

function refillBox(){
    document.getElementById('bowling').value = getLaneString();
}

function getLaneString(){
    var lane = '';

    lane = addZeroesToString(lane, leadingZeroes);
    lane = lane + pins;
    lane = addZeroesToString(lane, trailingZeroes);
    
    return lane;
    
    function addZeroesToString(str, numOfZeroes){
        for (i = 0; i < numOfZeroes; i++){
            str = str + '0';
        }
        return str;
    }
}

function score(lane){
    return lane.slice(-1);
}

refillBox();
readOnly(false);

var blocker = false;
var rolling = true;

function start(){
    readOnly(false);
    blocker = false;
}

function keyDown(event){
    if (blocker || event.keyCode !== 8){
        refillBox();
        return;
    }
    rolling = true;
}

function keyUp(event){
    if (blocker || !rolling || event.keyCode !== 8){
        refillBox();
        return;
    }
    var score;
    score = document.getElementById('bowling').value;
    alert(score);
    refillBox();
    rolling = false;
}

function readOnly(tf){
    document.getElementById('bowling').readOnly = tf;
}

function refillBox(){
    document.getElementById('bowling').value = "0000013579753100000000000000000000000000000000000000000000000000000000";
}
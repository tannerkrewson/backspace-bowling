const leadingZeroes = 5;
const pins = "135797531";
const trailingZeroes = 56;
const totalNumberOfFrames = 10;

const laneBox = document.getElementById('bowling');
const scoreTable = document.getElementById('scoretable');

var blockInput;
var rolling = false;
var frame;
var totalScore;
var gameInProgress = false;

setLaneBoxReadOnly(true);

function startBowling() {
    refillBox();
    frame = 1;
    totalScore = 0;
    gameInProgress = true;
    setLaneBoxReadOnly(false);
    focusBox();
}

function keyDown(event) {
    if (blockInput || event.keyCode !== 8) {
        if (gameInProgress) {
            refillBox();
        } else {
            clearBox();
        }
        return;
    }
    rolling = true;
}

function keyUp(event) {
    if (blockInput || !rolling || event.keyCode !== 8) {
        if (gameInProgress) {
            refillBox();
        } else {
            clearBox();
        }
        return;
    }
    var result = laneBox.value;
    score(result);
    if (gameInProgress) {
        advanceFrame();
        refillBox();
        focusBox();
        rolling = false;
    }
}

function setLaneBoxReadOnly(tf) {
    blockInput = tf;
    laneBox.readOnly = tf;
}

function refillBox() {
    laneBox.value = getLaneString();
    console.log('yo!');
}

function clearBox() {
    laneBox.value = '';
    console.log('hey');
}

function focusBox() {
    laneBox.focus();
}

function getLaneString() {
    var lane = '';

    lane = addZeroesToString(lane, leadingZeroes);
    lane = lane + pins;
    lane = addZeroesToString(lane, trailingZeroes);

    return lane;

    function addZeroesToString(str, numOfZeroes) {
        for (i = 0; i < numOfZeroes; i++) {
            str = str + '0';
        }
        return str;
    }
}

function score(lane) {
    var score = getScore(lane);
    addToTotal(score);
    writeTotal(totalScore);
    scoreTable.rows[frame].cells[1].firstChild.data = score;
    alert('You\'ve scored ' + score);
    if (frame >= totalNumberOfFrames) {
        endGame();
    }
}

function addToTotal(n){
    totalScore += n;
}

function writeTotal(total){
    scoreTable.rows[11].cells[1].firstChild.data = total;
}

function advanceFrame() {
    frame++;
}

function getScore(lane) {
    return parseInt(lane.slice(-1));
}

function endGame() {
    gameInProgress = false;
    setLaneBoxReadOnly(true);
    alert('Total score: ' + totalScore);
    clearBox();
}

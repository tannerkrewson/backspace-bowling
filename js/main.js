const leadingZeroes = 5;
const pins = "135797531";
const trailingZeroes = 56;

const laneBox = document.getElementById('bowling');
const scoreTable = document.getElementById('scoretable');

var blockInput = true;
var rolling = true;
var frame = 1;
var totalScore = 0;

readOnly(true);

function startBowling() {
    readOnly(false);
    blockInput = false;
    refillBox();
}

function keyDown(event) {
    if (blockInput || event.keyCode !== 8) {
        refillBox();
        return;
    }
    rolling = true;
}

function keyUp(event) {
    if (blockInput || !rolling || event.keyCode !== 8) {
        refillBox();
        return;
    }
    var result = laneBox.value;
    score(result);
    advanceFrame();
    refillBox();
    rolling = false;
}

function readOnly(tf) {
    laneBox.readOnly = tf;
}

function refillBox() {
    laneBox.value = getLaneString();
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
    if (frame >= 10) {
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
    alert('Total score: ' + totalScore);
}

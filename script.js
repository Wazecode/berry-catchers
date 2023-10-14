// WINDOW Settings
var canvas = document.getElementById('window');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//RENDER SETTINGS
var context = canvas.getContext('2d');
context.font = "30px Comic Sans MS";
context.textAlign = "center";

// Games States
const GAME_RUNNING = 1;
const GAME_PAUSE = 2;
const GAME_START = 3
const GAME_OVER = 4;

const GAME_TIME = 100;
const DIFF_CHANGE = 3;
var gameState = GAME_START;

// Player's stuff
const PLAYER_VEL = 10;
const PLAYER_INTIAL_POS_X = x = canvas.width / 2;
const PLAYER_INTIAL_POS_Y = 9 * canvas.height / 10;
const PLAYER_WIDTH = 90;
const PLAYER_HEIGTH = 10;

var pos = PLAYER_INTIAL_POS_X

var score = 0;
var difficulty = 1;

// Cherry's stuff 
class Cherry {
    static color = 'red';
    static CHERRY_SIZE = 20;
    constructor() {
        this.reset();
    }

    reset() {
        this.posX = getRandomInt(0, canvas.width);
        this.dropSpeed = getRandomInt(1,5);
        this.posY = -10;
    }

    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.posX, this.posY , 30, 30);
    }

    update() {
        this.posY += this.dropSpeed;
    }

    collisionCheck() {
        if(this.posY >= PLAYER_INTIAL_POS_Y - PLAYER_HEIGTH && this.posY >= PLAYER_INTIAL_POS_Y + PLAYER_HEIGTH &&  
            this.posX > pos - PLAYER_WIDTH && this.posX < pos + PLAYER_WIDTH ) {
            this.reset();
            score++;    
        }
        else if(this.posY > canvas.height) {
            this.reset();
        }
    }

}
// ------------------------------------------------

// timer ------------------------
var time = 0;
function startTime() {
    time = 0;
    timeWatch = setInterval(timeUpdate, 1000);
}

function timeUpdate() {
    console.log("updates");
    console.log(time);
    time += 1;
}

function timeReset() {
    time = 0;
}

function timePaused() {
    time--;
}


//------------------ Helping function -----------

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function cherryDo(c) {
    c.draw();
    c.update();
    c.collisionCheck();
}

//--------------------------------------------------
var cherries = new Array(new Cherry);


function mainLoop() {
    requestAnimationFrame(mainLoop);
    context.clearRect(0,0,canvas.width,canvas.height);

    context.fillStyle = 'black';
    context.fillText(score , canvas.width/15, canvas.height/10);
    context.fillText(3, 14* canvas.width/15, canvas.height/10);

    switch(gameState) {
    case GAME_START:
        context.fillText("BERRY CATCHER", canvas.width/2, canvas.height/2);
        timePaused();
        break;
    case GAME_PAUSE:
        context.fillText("PAUSED", canvas.width/2, canvas.height/2);
        timePaused();
        break;
    case GAME_OVER:
        context.fillText("GAME OVER", canvas.width/2, canvas.height/2);
        timePaused();
        break;
    case GAME_RUNNING:
        if(time > GAME_TIME) {
            gameState = GAME_OVER;
            timeReset();
        }
        if(score > difficulty*DIFF_CHANGE) {
            difficulty++;
            cherries.push(new Cherry);
        }
        cherries.forEach(cherryDo);
        context.fillStyle = 'yellow';
        if(pos < 0)
            pos = canvas.width;
        else if(pos > canvas.width)
            pos = 0;
        context.fillRect(pos, PLAYER_INTIAL_POS_Y, PLAYER_WIDTH, PLAYER_HEIGTH);
    }

}


document.addEventListener('keydown', function(e) {

    //right arrow key
    if (e.code == "ArrowRight") {
        pos += PLAYER_VEL;
    }
    // left arrow key
    else if (e.code == "ArrowLeft") {
        pos -= PLAYER_VEL;
    }
    // Enter
    else if(e.code == "Enter" && gameState > 1) {
        if(gameState > 2) startTime();
        gameState = GAME_RUNNING;
    // 'P'
    } else if(e.code == "KeyP" && gameState === GAME_RUNNING) {
        gameState = GAME_PAUSE;
    }
});

requestAnimationFrame(mainLoop);

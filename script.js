// WINDOW Settings
var canvas = document.getElementById('window');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//RENDER SETTINGS
var context = canvas.getContext('2d');
context.font = "50px Comic Sans MS";
context.textAlign = "center";

// Images
const IMAGE_BC = document.getElementById('Berry-Catchers');
const IMAGE_BASKET = document.getElementById('basket');
const IMAGE_CHERRY = document.getElementById('cherry');

// Games States
const GAME_RUNNING = 1;
const GAME_PAUSE = 2;
const GAME_START = 3
const GAME_OVER = 4;

const GAME_TIME = 100;
const DIFF_CHANGE = 3;
var gameState = GAME_START;

// Player's stuff
const PLAYER_VEL = 20;
const PLAYER_INTIAL_POS_X = x = canvas.width / 2;
const PLAYER_INTIAL_POS_Y = 8 * canvas.height / 10;
const PLAYER_WIDTH = 150;
const PLAYER_HEIGTH = 90;

var pos = PLAYER_INTIAL_POS_X

var score = 0;
var difficulty = 1;

// Cherry's stuff 
const CHERRY_SIZE = 70;
const CHERRY_MAX_SPEED = 7;
const CHERRY_MIN_SPEED = 2;
class Cherry {
    constructor() {
        this.reset();
    }

    reset() {
        this.posX = getRandomInt(0, canvas.width);
        this.dropSpeed = getRandomInt(3,8);
        this.posY = -10;
    }

    draw() {
        context.drawImage(IMAGE_CHERRY, this.posX, this.posY, CHERRY_SIZE, CHERRY_SIZE);
    }

    update() {
        this.posY += this.dropSpeed;
    }

    collisionCheck() {
        if(this.posY >= PLAYER_INTIAL_POS_Y - PLAYER_HEIGTH/2 && this.posY <= PLAYER_INTIAL_POS_Y + PLAYER_HEIGTH &&  
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
    time += 1;
}

function timeReset() {
    clearInterval(timeWatch);
    time = 0;
}

function timePaused() {
    time ;
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

function gameReset() {
    score = 0;
    difficulty = 1;
    cherries = new Array(new Cherry);
}

//--------------------------------------------------
var cherries;

function mainLoop() {
    requestAnimationFrame(mainLoop);
    context.fillStyle = '#87CEEB'
    var gr = context.createLinearGradient(0, 500, 0, 500);
    gr.addColorStop(0, '#87CEEB')
    gr.addColorStop(1, '#ADD8E6')
    context.fillRect(0,0,canvas.width,canvas.height);
    context.stroke();


    switch(gameState) {
    case GAME_START:
        context.drawImage(IMAGE_BC, canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
        break;
    case GAME_PAUSE:
        context.fillText("PAUSED", canvas.width/2, canvas.height/2);
        break;
    case GAME_OVER:
        context.fillStyle = 'white';
        context.fillText("SCORE: " + score, canvas.width/2, canvas.height/2);
        break;
    case GAME_RUNNING:
        context.fillStyle = 'white';
        context.fillText(score , canvas.width/15, canvas.height/10);
        context.fillText(100 - time, 14* canvas.width/15, canvas.height/10);

        if(time > GAME_TIME) {
            gameState = GAME_OVER;
            timeReset();
        }

        if(difficulty < 10 && score > difficulty*DIFF_CHANGE) {
            difficulty++;
            cherries.push(new Cherry);
        }

        cherries.forEach(cherryDo);

        if(pos + PLAYER_WIDTH < 0)
            pos = canvas.width;
        else if(pos > canvas.width)
            pos = -PLAYER_WIDTH + 1;
        context.drawImage(IMAGE_BASKET, pos, PLAYER_INTIAL_POS_Y, PLAYER_WIDTH, PLAYER_HEIGTH);
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
        if(gameState > 2) {
            gameReset();
            startTime();
        }
        gameState = GAME_RUNNING;
    // 'P'
    } else if(e.code == "KeyP" && gameState === GAME_RUNNING) {
        gameState = GAME_PAUSE;
    }
});

requestAnimationFrame(mainLoop);

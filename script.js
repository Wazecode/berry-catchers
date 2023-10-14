var canvas = document.getElementById('window');
var context = canvas.getContext('2d');

// Player constants
const PLAYER_VEL = 10;
const PLAYER_INTIAL_POS_X = x = canvas.width / 2;
const PLAYER_INTIAL_POS_Y = 9 * canvas.height / 10;
// Games States
const GAME_RUNNING = 1;
const GAME_PAUSE = 2;
const GAME_START = 3
const GAME_OVER = 4;

var canvas = document.getElementById('window');
var context = canvas.getContext('2d');
context.font = "30px Comic Sans MS";
context.textAlign = "center";

var gameState = GAME_START;

var score = 0;

var Player = {
    x: PLAYER_INTIAL_POS_X
};
function gameLoop() {
    requestAnimationFrame(gameLoop);
    context.clearRect(0,0,canvas.width,canvas.height);

    context.fillText(score , canvas.width/15, canvas.height/10);

    switch(gameState) {
    case GAME_START:
        context.fillText("CATCHY", canvas.width/2, canvas.height/2);
        break;
    case GAME_PAUSE:
        context.fillText("Paused", canvas.width/2, canvas.height/2);
        break;
    case GAME_OVER:
        context.fillText("GAME OVER", canvas.width/2, canvas.height/2);
        break;
    case GAME_RUNNING:
        context.fillStyle = 'red'
        if(Player.x < 0)
            Player.x = canvas.width;
        else if(Player.x > canvas.width)
            Player.x = 0;
        context.fillRect(Player.x, PLAYER_INTIAL_POS_Y, 60, 20);
    }

}


document.addEventListener('keydown', function(e) {
    console.log(e.which);

    //right arrow key
    if (e.which === 39) {
        Player.x += PLAYER_VEL;
    }
    // left arrow key
    else if (e.which === 37) {
        Player.x -= PLAYER_VEL;
    }
    // Enter
    else if(e.which === 13 && gameState > 1) {
        gameState = GAME_RUNNING;
    // 'P'
    } else if(e.which === 80 && gameState === GAME_RUNNING) {
        gameState = GAME_PAUSE;
    }
});

requestAnimationFrame(gameLoop);

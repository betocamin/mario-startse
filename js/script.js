const gameEnd = document.querySelector(".restart");
const mario = document.querySelector(".super-mario");
const pipe = document.querySelector(".pipe-game");
const marioJumpSound = new Audio('../assets/jump-small.mp3');
const gameOver = new Audio('../assets/gameover.mp3');

var score = 0;

const marioGame = new Audio('../assets/mario-game.mp3');
if (typeof marioGame.loop == 'boolean') {
  marioGame.loop = true;
}
else {
  marioGame.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
}
marioGame.play(); // start mario game sound
marioGame.loop = true;

const jump = () => {
  mario.classList.add("jump-mario");
  marioJumpSound.play();

  setTimeout(() => {
    mario.classList.remove("jump-mario");
  }, 600);
};

const loopGame = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

    ++score;
    document.getElementById('totalScore').innerHTML = ('00000'+(score/10).toFixed(0)).slice(-5);    

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

    gameOver.play(); // play game over
    marioGame.pause(); // stops mario game sound

    gameEnd.style.display = "";
      
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
       
    mario.src = "./Images/mario-game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "45px";

    clearInterval(loopGame);
  }
}, 10);

function restart(){
  document.location.reload();
}

// Mario jump's on spacebar ou arrow up key press
document.addEventListener('keydown', event => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    jump();
  }
})

console.log("Fruit Cutter game Loaded!");
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScore");
const playAgainButton = document.getElementById("playAgainButton");


let fruitInterval;
let timerInterval;

let fruitSpeed = 3;
let score = 0;
let lives = 3;
let timeLeft = 120;

const fruits = ["🍉","🥭","🥝","🍊","🍇","🍓","🍍"];

let isSlicing = false;

//Start Game


startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    // reset game values
    
    score = 0;
    lives = 3;
    timeLeft = 120;

    scoreDisplay.textContent = score ;
    livesDisplay.textContent = " ❤️❤️❤️";
    timerDisplay.textContent = "02:00";


    fruitInterval = setInterval(createFruit,900);
    timerInterval = setInterval(updateTimer,1000);

    setInterval(function(){
        if (fruitSpeed > 0.8){
            fruitSpeed -= 0.2;
        }
    },4000);

});


//Timer


function updateTimer(){
    timeLeft--;
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0");
    if (timeLeft <= 0){
        clearInterval(timerInterval);
        clearInterval(fruitInterval);

        alert("Time's Up! Your Score: "+ score);

    }
}


//create fruit/bomb

function createFruit() {
    const fruit = document.createElement("div");

    //20% bomb 
    if (Math.random() < 0.2){
        fruit.textContent ="💣";
        fruit.classList.add("bomb");
    }
    else{

    fruit.textContent = fruits[Math.floor(Math.random()*fruits.length)];
    fruit.classList.add("fruit");
    }
    fruit.style.animationDuration = fruitSpeed + "s";

    fruit.style.left = Math.random() * 90 + "%";

    gameArea.appendChild(fruit);

    //remove objects when animation ends 

    
    fruit.addEventListener("animationend", function () {
        if(fruit.classList.contains("fruit")){
            lives--;
            updateLives();

        }
        fruit.remove();
    });
}


//update lives

function updateLives(){
    let hearts ="";
    for(let i = 1;i <= 3;i++){
        if(i <= lives){
            hearts += "❤️";
        }else{
            hearts += "💔";
        }
    }
    livesDisplay.textContent = hearts;
    
    if(lives <= 0){
        gameOver();
    }
}

//game over

function gameOver() {
    clearInterval(fruitInterval);
    clearInterval(timerInterval);

    gameArea.innerHTML = "";

    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";

    finalScoreDisplay.textContent = score;
}


//start slicing 
gameArea.addEventListener("mousedown", function (event) {
    if (event.button === 0){
    isSlicing = true;
    }

});


//  Stop Slicing


gameArea.addEventListener("mouseup", function () {
    
    isSlicing = false;

});



// Detect Fruit/bomb  While Slicing


gameArea.addEventListener("mousemove", function (event) {

    if (!isSlicing) {
        return;
    }

    const x = event.clientX;
    const y = event.clientY;

    //create blade

    createBlade(x, y);
    const object = document.elementFromPoint(x, y);

    if (object&& object.classList.contains("fruit")) {
        

        // create splash 
        createSplash(x, y);

        //create two fruit halves
        createFruitHalves(object);

        //Add score
        score += 10;
        scoreDisplay.textContent = score;
        
        object.remove();

    }

    //bomb cut 
    if (object && object.classList.contains("bomb")){
        lives--;
        updateLives();

        object.remove();
    }

});
// Blade Effect

function createBlade(x, y) {
    const blade = document.createElement("div");

    blade.classList.add("blade");

    blade.style.left = x + "px";
    blade.style.top = y + "px";

    gameArea.appendChild(blade);

    setTimeout(function () {
        blade.remove();
    }, 100);
}


// Splash Effect

function createSplash(x, y) {

    for (let i = 0; i < 14; i++) {

        const particle = document.createElement("div");

        particle.classList.add("splash");

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 60;

        particle.style.setProperty(
            "--moveX",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--moveY",
            Math.sin(angle) * distance + "px"
        );

        gameArea.appendChild(particle);

        setTimeout(function () {
            particle.remove();
        }, 450);
    }
}


// Fruit Split Effect

function createFruitHalves(fruit) {

    const rect = fruit.getBoundingClientRect();

    const leftHalf = document.createElement("div");
    const rightHalf = document.createElement("div");

    leftHalf.textContent = fruit.textContent;
    rightHalf.textContent = fruit.textContent;

    leftHalf.classList.add("fruit-half", "left-half");
    rightHalf.classList.add("fruit-half", "right-half");

    leftHalf.style.left = rect.left + "px";
    leftHalf.style.top = rect.top + "px";

    rightHalf.style.left = rect.left + "px";
    rightHalf.style.top = rect.top + "px";

    gameArea.appendChild(leftHalf);
    gameArea.appendChild(rightHalf);

    setTimeout(function () {
        leftHalf.remove();
        rightHalf.remove();
    }, 400);
}

//play again 
playAgainButton.addEventListener("click", function () {
    gameOverScreen.style.display = "none";
    gameScreen.style.display = "block";

    score = 0;
    lives = 3;
    timeLeft = 120;
    fruitSpeed = 3;

    scoreDisplay.textContent = score;
    livesDisplay.textContent = "❤️❤️❤️";
    timerDisplay.textContent = "02:00";

    fruitInterval = setInterval(createFruit, 900);
    timerInterval = setInterval(updateTimer, 1000);
});
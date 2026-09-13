console.log("Fruit Cutter game Loaded!");
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameArea = document.getElementById("gameArea");

let fruitInterval;
let fruitSpeed = 3;
const fruits = ["🍉","🥭","🥝","🍊","🍇","🍓","🍍"];

let isSlicing = false;

//Start Game


startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    fruitInterval = setInterval(createFruit,900);
    setInterval(function(){
        if (fruitSpeed > 0.8){
            fruitSpeed -= 0.2;
        }
    },4000);

});

//create fruit

function createFruit() {
    const fruit = document.createElement("div");

    fruit.textContent = fruits[Math.floor(Math.random()*fruits.length)];
    fruit.classList.add("fruit");
    fruit.style.animationDuration = fruitSpeed + "s";

    fruit.style.left = Math.random() * 90 + "%";

    gameArea.appendChild(fruit);

    //remove fruit when reaches top

    
    fruit.addEventListener("animationend", function () {
        fruit.remove();
    });
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



// Detect Fruit While Slicing


gameArea.addEventListener("mousemove", function (event) {

    if (!isSlicing) {
        return;
    }

    const x = event.clientX;
    const y = event.clientY;

    //create blade

    createBlade(x, y);
    const fruit = document.elementFromPoint(x, y);

    if (fruit && fruit.classList.contains("fruit")) {
        

        // create splash 
        createSplash(x, y);

        //create two fruit halves


        fruit.remove();

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
let inputDir = {
    x : 0,
    y : 0
}
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 0.3;
let lastPaintTime = 0;


let snakeArr = [
    {x:13,y:15}
]
let score = 0;
let food = {x:6,y:8};

// Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/100 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sArr){
    // If you bump into yourself
    for (let i = 1; i < sArr.length; i++) {
        if(sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y){
            return true;
        }
        if(sArr[0].x>=18||sArr[0].x<=0 || sArr[0].y>=18||sArr[0].y<=0){
            return true;
        }
        
    }
    return false;
}


function gameEngine(){
    // Part 1 : Updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {
            x : 0,
            y : 0
        };
        alert("Game Over, Press any key to Play again");
        musicSound.play();
        snakeArr = [{x:13,y:15}];
        score = 0;
    }

    // If you have eaten the food, increment the food and regenerate the food;
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score+=1;
        speed+=0.05;
        scoreBox.innerHTML = "Score : "+score;
        snakeArr.unshift({
            x : snakeArr[0].x + inputDir.x,
            y : snakeArr[0].y + inputDir.y
        });
        let a = 1;
        let b = 17;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
        
    } 


    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
       
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    // Part 2 : Display the food and snake
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,i)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(i===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Game Logic
musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x:0,y:1};   //Start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
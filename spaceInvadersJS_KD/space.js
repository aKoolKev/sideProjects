/*
    Author: Kevin Dong
    Date: Jun. 16, 2024
    Purpose: A simple webpage Space Invader in Star Wars Themed using HTML, JS, and CSS
*/

//board info
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context; //used for drawing on the board


//ship info
let shipWidth = tileSize*2; //32
let shipHeight = tileSize; //16
let shipX = boardWidth/2  - tileSize; //ship initial position: in middle of width
let shipY = boardHeight  - tileSize*2; //...close to bottom border of board
let shipImg; //ship image
let shipVelocityX = tileSize; //ship moving speed

//ship object
let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight,
    alive : true
}

let bulletArray = []; //holds user bullets
let bulletVelocityY = -10; //bullet moving speed

//enemy info
let enemyArray = []; //hold all the enemy ships
let enemyWidth = tileSize*2.2;
let enemyHeight = tileSize*1.2;
let enemyX = tileSize;
let enemyY = tileSize;
let enemyImg;
let enemyImgRed;
let enemyPerRow = 2;
let enemyPerColumn = 3;
let enemyCount = 0; //number of enemy to defeat
let enemyVelocityX = 1; //enemy move speed

let enemyBulletArray = []; //hold enemy bullets
let enemyBulletVelocityY = 5; //enemy shoots "downward"


let explosionImg; //image when any ship gets by bullet

//game info
let score = 0;
let levelCounter = 1; //keep track of stage number
let gameOver = false;


//draw the canvas
window.onload = function() {
    board = document.getElementById('board');
    
    //set board size
    board.width = boardWidth;
    board.height = boardHeight;

    context = board.getContext('2d');  
    
    //load images...

    //player
    shipImg = new Image();
    shipImg.src = './userShip.png';
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    //enemy
    enemyImg = new Image();
    enemyImg.src = './enemyShip.png';

    enemyImgRed = new Image();
    enemyImgRed.src = './enemyShipRed.png';

    //image when ships get hit with a bullet
    explosionImg = new Image();
    explosionImg.src = './explosion.png';

    //generate the enemies ship for this current level
    createEnemies();

    //calls update before each repaint
    requestAnimationFrame(update);

    document.addEventListener('keydown', moveShip); //handles user's movement (left and right only)
    document.addEventListener('keyup', shoot) //handles user's action (shooting bullets)
}

//repeatedly draw the current state of the canvas
function update() {

    requestAnimationFrame(update);

    //end of game
    if (gameOver){
        gameOverScreen();
        return;
    }

    //clear board 
    context.clearRect(0,0,board.width,board.height); 

    //draw user ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    

    //only draw enemy ship that has not been hit with a bullet
    for (let i=0; i<enemyArray.length; i++){
        
        let enemy = enemyArray[i];

        if (enemy.alive){

            //enemy's movement
            enemy.x += enemyVelocityX;

            //reverse direction when hitting the end of the board and...
            if (enemy.x + enemy.width >= board.width || enemy.x <= 0){
                enemyVelocityX *= -1;
                enemy.x += enemyVelocityX*2; //fix out of sync issue. "One step foward, 2 steps back"

                //....move all enemy "down" by one row
                for (let j=0; j<enemyArray.length; j++)
                    enemyArray[j].y += enemyHeight; 
            }

            //draw the enemy ship
            context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
            
            //game is over when an enemy reaches the same row as the player's ship
            if (enemy.y >= ship.y){
                gameOver = true;
            }

        }
    }

    //shoots enemy bullet
    for (let i=0; i<enemyBulletArray.length; i++){
        let enemyBullet = enemyBulletArray[i];
        enemyBullet.y += enemyBulletVelocityY; //moves down 
        context.fillStyle = "red";
        context.fillRect(enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height); 

        //check for any enemy bullet collision with player's ship
        for (let i=0; i<enemyBulletArray.length; i++){
            let enemyBullet = enemyBulletArray[i];

            if (!enemyBullet.used && ship.alive && detectCollision(enemyBullet, ship))
            {
                enemyBullet.used = true; //optional
                shipImg = explosionImg; //display ship has been hit
                context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
                gameOver = true;
                return;
            }
        }

    } 

    //clear any enemy bullets objects that are off the board (memory optimization)
    while(enemyBulletArray.length > 0 && (enemyBulletArray[0].y >= board.height))
        enemyBulletArray.shift(); //remove first element of array
    
    //shoot user's bullets
    for (let i=0; i< bulletArray.length; i++){

        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY; //moves up
        context.fillStyle = "orange"; //color of the bullet
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        //check for any bullet collision with enemy
        for (let j=0; j<enemyArray.length; j++){
            let enemy = enemyArray[j];
            if (!bullet.used && enemy.alive && detectCollision(bullet, enemy)){
                bullet.used = true;
                enemy.alive = false;
                enemy.img = explosionImg;

                stopEnemyShooting(enemy.intervalID); //this enemy that can shoot can no longer shoot

                //show explosion for 5 seconds
                context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
               
                setTimeout(() => {
                    context.clearRect(0, 0, board.width, board.height);
                }, 5000);

                enemyCount--;
                score+=100;
            }
        }
    }
    
    //clear used user's bullet or out of the board (memory optimization)
    while(bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0))
        bulletArray.shift(); //remove first element of array


    //advance to next level
    if (enemyCount == 0){

        levelCounter++;

        //increase the number of enemies in columns and rows by 1
        score += enemyPerColumn * enemyPerRow * 100; //bonus points :)

        enemyPerColumn = Math.min(enemyPerColumn + 1, columns/2 -2); //cap at 16/2 -2 = 6 columns of enemies
        enemyPerRow = Math.min(enemyPerRow + 1, rows-4); //cap at 16-4 = 12

        if (enemyVelocityX > 0)
            enemyVelocityX += 0.2; //increase the enemies movement speed
        else    
            enemyVelocityX -= 0.2;

        enemyArray = []; //zero enemies

        //clear bullets
        bulletArray = []; 
        enemyBulletArray = []; 
        createEnemies();
    }

    //display score
    context.fillStyle = 'white';
    context.font='16px courier';
    context.fillText("Level: " + levelCounter, 5, 20);
    context.fillText(score, 5, 40);
}

function createEnemies() {

    //randomly select which Enemies can shoot
    let totalEnemy = enemyPerRow * enemyPerColumn;
    let numCanShoot = Math.floor(totalEnemy / 3);

    let randRow, randCol;
    
    let storeRow = [];
    let storeCol = [];

    let unique; //prime the while loop
    
    for (let i=0; i<numCanShoot; i++){
        unique = false;
        
        //insure unique position
        while(!unique){

            //suppose position is unique
            randRow = getRandomInt(0,enemyPerRow-1);
            randCol = getRandomInt(0,enemyPerColumn-1);
            unique = true;

            //check if it is truly unique
            for (let j=0; j<storeRow.length; j++){
                if (storeRow[j] === randRow && storeCol[j] === randCol){
                    unique = false; // actually not unique
                    break;
                }
            }
        }
        
        //save unique position
        storeRow.push(randRow);
        storeCol.push(randCol);
    }
    
    //create and place enemies 
    for (let col = 0; col < enemyPerColumn; col++){
        for (let row=0; row < enemyPerRow; row++){
            let canShootVal = false;
       
            
            //find the enemy ship that can shoot
            for (let i=0; i<storeRow.length; i++){
                if (col === storeCol[i] && row === storeRow[i]){
                    canShootVal = true;
                    break;
                }
            }

            let intervalID; //store the setInterval ID so can be turned off when ship is destroyed

            //have the ship shoot a random intervals
            if (canShootVal)
                intervalID = setInterval(()=>{enemyShoot(enemy.x, enemy.y)}, getRandomInt(1,5)*1000);

            //create enemy ship object
            let enemy = {
                img : canShootVal ? enemyImgRed : enemyImg, //set ship to red if it can shoot
                x : enemyX + col*enemyWidth,
                y : enemyY + row*enemyHeight,
                width : enemyWidth,
                height : enemyHeight,
                alive : true,
                canShoot : canShootVal, //can this ship fire back
                intervalID : intervalID //the setInterval() to delete
            }

            enemyArray.push(enemy);
        }
    }
    enemyCount = enemyArray.length;
}

//handle user ship movement (left or right)
function moveShip(e) {

    if (gameOver)
        return;

    //moving left one tile
    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0){
        ship.x -= shipVelocityX; 
    }
    //moving right one tile
    else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width){
        ship.x += shipVelocityX; 
    }
}


//user press the "space bar" to shoot
function shoot(e){
    if (gameOver)
        return;    

    if (e.code == "Space"){

        let bullet = {
            x : ship.x + shipWidth*15/32, //place bullet in front of ship
            y : ship.y,
            width : tileSize/8,
            height : tileSize/2,
            used : false //did it hit a ship?
        }
        bulletArray.push(bullet);
    }
}

//create enemy bullet to be fired
function enemyShoot(xPos, yPos){
    //create bullet object
    let bullet = {
        x : xPos + enemyWidth*15/32,
        y : yPos,
        width : tileSize/4,
        height : tileSize/2,
        used : false
    }

    enemyBulletArray.push(bullet);
}

//stop firing when a ship that can shoot is destroyed
function stopEnemyShooting (intervalID){
    clearInterval(intervalID);
}

//detect collision between two objects
function detectCollision(a, b){
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't pass b's top left bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

//display end game screen
function gameOverScreen() {
    context.fillStyle='red';  
    context.font="50px courier";
    context.fillText("GAME OVER!", (board.width/2)-145, board.height/2);
}

//return a random number within the specified interval (inclusive [x,y])
function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

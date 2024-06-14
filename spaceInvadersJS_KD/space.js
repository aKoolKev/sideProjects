//board
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context; //used for drawing on the board


//ship
let shipWidth = tileSize*2; //32
let shipHeight = tileSize; //16
let shipX = boardWidth/2  - tileSize; //ship initial position: in middle of width
let shipY = boardHeight  - tileSize*2; //...close to bottom border of board
let shipImg; //ship image
let shipVelocityX = tileSize; //ship moving speed

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight,
    alive : true
}

//enemy
let enemyArray = []; //hold all the enemy ship
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

let enemyBulletArray = [];
let enemyBulletVelocityY = 5; //enemy shoots "down"

//bullets
let bulletArray = [];
let bulletVelocityY = -10; //bullet moving speed

let explosionImg;

let score = 0;
let levelCounter = 1;
let gameOver = false;



window.onload = function() {
    board = document.getElementById('board');
    
    //set board size
    board.width = boardWidth;
    board.height = boardHeight;

    context = board.getContext('2d');  

    //draw initial ship
    // context.fillStyle = "green";
    // context.fillRect(ship.x, ship.y, ship.width, ship.height);
    
    //load images
    shipImg = new Image();
    shipImg.src = './userShip.png';
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    // Preload images
    enemyImg = new Image();
    enemyImg.src = './enemyShip.png';

    enemyImgRed = new Image();
    enemyImgRed.src = './enemyShipRed.png';

    explosionImg = new Image();
    explosionImg.src = './explosion.png';

    createEnemies();

    requestAnimationFrame(update);

    document.addEventListener('keydown', moveShip); //keydown = tap and can hold
    document.addEventListener('keyup', shoot) // keyup = tap then release
}

function update() {

    requestAnimationFrame(update);



    if (gameOver){
        gameOverScreen();
        return;
    }

    //clear board 
    context.clearRect(0,0,board.width,board.height); 

    //repeatedly drawing ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    

    //draw in alien
    for (let i=0; i<enemyArray.length; i++){
        
        let enemy = enemyArray[i];
        if (enemy.alive){
            //enemy's movement
            enemy.x += enemyVelocityX;

            if (enemy.x + enemy.width >= board.width || enemy.x <= 0){
                enemyVelocityX *= -1;
                enemy.x += enemyVelocityX*2; //fix out of sync issue. One step foward, 2 steps back 

                //move all enemy "down" by one row
                for (let j=0; j<enemyArray.length; j++)
                    enemyArray[j].y += enemyHeight; 
            }

            
            context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
            
            if (enemy.y >= ship.y){
                gameOver = true;
            }
        }
    }


    //shoot enemy bullet
    for (let i=0; i<enemyBulletArray.length; i++){
        let enemyBullet = enemyBulletArray[i];
        enemyBullet.y += enemyBulletVelocityY;
        context.fillStyle = "red";
        context.fillRect(enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height); 

        //enemy bullet collision with player
        for (let i=0; i<enemyBulletArray.length; i++){
            let enemyBullet = enemyBulletArray[i];

            if (!enemyBullet.used && ship.alive && detectCollision(enemyBullet, ship))
            {
                shipImg = explosionImg;
                context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
                gameOver = true;
            }
        }

    } 

    //clear enemy bullets
    while(enemyBulletArray.length > 0 && (enemyBulletArray[0].y >= board.height))
        enemyBulletArray.shift(); //remove first element of array
    

    //shoot user bullets
    for (let i=0; i< bulletArray.length; i++){
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle = "orange"; //color of the bullet
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        //bullet collision with enemy
        for (let j=0; j<enemyArray.length; j++){
            let enemy = enemyArray[j];
            if (!bullet.used && enemy.alive && detectCollision(bullet, enemy)){
                bullet.used = true;
                enemy.alive = false;
                enemy.img = explosionImg;

                stopEnemyShooting(enemy.intervalID);

                //show explosion for 5 seconds
                context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
               
                setTimeout(() => {
                    context.clearRect(0, 0, board.width, board.height);
                }, 5000);


                
                context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
                enemyCount--;
                score+=100;
            }
        }
    }
    
    //clear bullets
    while(bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0))
        bulletArray.shift(); //remove first element of array

    console.log('USER bulllets[] s: ' + bulletArray.length);
   
    // //clear bullets
    // while(bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0))
    //     bulletArray.shift(); //remove first element of array


    //next level
    if (enemyCount == 0){

        levelCounter++;

        //increase the number of enemies in columns and rows by 1
        score += enemyPerColumn * enemyPerRow * 100; //bonus points :)

        enemyPerColumn = Math.min(enemyPerColumn + 1, columns/2 -2); //cap at 16/2 -2 = 6 columns of enemies
        enemyPerRow = Math.min(enemyPerRow + 1, rows-4); //cap at 16-4 = 12

        if (enemyVelocityX > 0)
            enemyVelocityX += 0.4; //increase the enemies movement speed
        else    
            enemyVelocityX -= 0.4;

        enemyArray = [];
        bulletArray = []; // clear bullets
        enemyBulletArray = [];
        createEnemies();
    }

    //score
    context.fillStyle = 'white';
    context.font='16px courier';
    context.fillText("Level: " + levelCounter,5, 20);
    context.fillText(score, 5, 40);
    
}

function moveShip(e) {
    if (gameOver)
        return;

    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0){
        ship.x -= shipVelocityX; //moving left one tile
    }
    else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width){
        ship.x += shipVelocityX; //moving right one tile
    }
}

function createEnemies() {

    //randomly select which Enemies can shoot
    let totalEnemy = enemyPerRow * enemyPerColumn;
    let numCanShoot = Math.floor(totalEnemy / 3);

    let randRow, randCol;
    
    let storeRow = [];
    let storeCol = [];

    let unique = false; //prime the while loop
    
    for (let i=0; i<numCanShoot; i++){
        
        unique = false; 
        
        //insure unique position
        while(!unique){
            //suppose position is unique
            randRow = getRandomInt(0,enemyPerRow-1);
            randCol = getRandomInt(0,enemyPerColumn-1);
            unique = true;

            for (let j=0; j<storeRow.length; j++){
                if (storeRow[j] === randRow && storeCol[j] === randCol){
                    unique = false; // actually not unique
                    // break;
                }
            }
        }
        
        //save unique position
        storeRow.push(randRow);
        storeCol.push(randCol);
    }
    

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

            let intervalID; 

            if (canShootVal)
                intervalID = setInterval(()=>{enemyShoot(enemy.x, enemy.y)}, getRandomInt(1,5)*1000);

            //create enemy object
            let enemy = {
                img : canShootVal ? enemyImgRed : enemyImg,
                x : enemyX + col*enemyWidth,
                y : enemyY + row*enemyHeight,
                width : enemyWidth,
                height : enemyHeight,
                alive : true,
                canShoot : canShootVal,
                intervalID : intervalID
            }

            enemyArray.push(enemy);
        }
    }
    enemyCount = enemyArray.length;
}

function shoot(e){
    if (gameOver)
        return;     
    if (e.code == "Space"){
        //shoot
        let bullet = {
            x : ship.x + shipWidth*15/32,
            y : ship.y,
            width : tileSize/8,
            height : tileSize/2,
            used : false
        }
        bulletArray.push(bullet);
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't pass b's top left bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function gameOverScreen() {
    context.fillStyle='red';  
    context.font="50px courier";
    context.fillText("GAME OVER!", (board.width/2)-145, board.height/2);
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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


function stopEnemyShooting (intervalID){
    clearInterval(intervalID);
}
/* 
    [TO-DO]
    * fix game over screen (Bug)
*/
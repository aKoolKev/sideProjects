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
    height: shipHeight
}


//enemy
let enemyArray = []; //hold all the enemy ship
let enemyWidth = tileSize*2;
let enemyHeight = tileSize;
let enemyX = tileSize;
let enemyY = tileSize;
let enemyImg;
let enemyPerRows = 2;
let enemyPerColumns = 3;
let enemyCount = 0; //number of enemy to defeat
let enemyVelocityX = 1; //enemy move speed

//bullets
let bulletArray = [];
let bulletVelocityY = -10; //bullet moving speed

let score = 0;
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
    shipImg.src = './ship.png';
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    enemyImg = new Image();
    enemyImg.src = './enemyShip.png';
    createEnemies();

    requestAnimationFrame(update);

    document.addEventListener('keydown', moveShip); //keydown = tap and can hold
    document.addEventListener('keyup', shoot) // keyup = tap then release
}

function update() {
    requestAnimationFrame(update);

    if (gameOver)
        return;

    context.clearRect(0,0,board.width,board.height); //clear board 
    
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
            context.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
            
            if (enemy.y >= ship.y)
                gameOver = true;
        }
    }

    //shoot bullets
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
                enemyCount--;
                score+=100;
            }
        }
    }

    //clear bullets
    while(bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0))
        bulletArray.shift(); //remove first element of array

    //next level
    if (enemyCount == 0){
        //increase the number of enemies in columns and rows by 1
        score += enemyPerColumns * enemyPerRows * 100; //bonus points :)

        enemyPerColumns = Math.min(enemyPerColumns + 1, columns/2 -2); //cap at 16/2 -2 = 6 columns of enemies
        enemyPerRows = Math.min(enemyPerRows + 1, rows-4); //cap at 16-4 = 12

        if (enemyVelocityX > 0)
            enemyVelocityX += 0.4; //increase the enemies movement speed
        else    
            enemyVelocityX -= 0.4;

        enemyArray = [];
        bulletArray = []; // clear bullets
        createEnemies();
    }

    //score
    context.fillStyle = 'white';
    context.font='16px courier';
    context.fillText(score, 5, 20);
    
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
    for (let col = 0; col < enemyPerColumns; col++){
        for (let row=0; row < enemyPerRows; row++){

            //create enemy object
            let enemy = {
                img : enemyImg,
                x : enemyX + col*enemyWidth,
                y : enemyY + row*enemyHeight,
                width : enemyWidth,
                height : enemyHeight,
                alive : true
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
const map = document.createElement('div'); //create a map
document.body.appendChild(map);
var mapSize = 17, tileSize = 30; 
map.style.width = `${mapSize * tileSize}px`;
map.style.height = `${mapSize * tileSize}px`;
map.style.border = '10px black solid';
map.style.display = 'block';
map.style.fontSize = '0';
map.style.position = 'relative';
var tiles = [], tileImg = [], tilesNum = 0;  // create the tiles
function tile(x, y) {
    this.x = x;
    this.y = y;
    tiles.push(this);
    tilesNum++;
    tileImg[tilesNum - 1] = document.createElement('div');
    map.appendChild(tileImg[tilesNum - 1]);
    tileImg[tilesNum - 1].style.width = `${tileSize}px`;
    tileImg[tilesNum - 1].style.height = `${tileSize}px`;
    tileImg[tilesNum - 1].style.backgroundColor = 'green';
    tileImg[tilesNum - 1].style.position = 'absolute';
    tileImg[tilesNum - 1].style.zIndex = '2';
    tileImg[tilesNum - 1].style.top = (this.y - 1) * tileSize + 'px';
    tileImg[tilesNum - 1].style.left = (this.x - 1) * tileSize + 'px';
}
for (var i = 1; i <= mapSize; i++) {
    for (var j = 1; j <= mapSize; j++) {
        tiles.push(tile(i, j));
    }
}
var snakePart = [], snakeImg = []; // the snake is here
snakeLength = 0;
function snake(x, y) {  // the snake properties
    this.x = x;
    this.y = y;
    snakeLength++;
    snakeImg[snakeLength - 1] = document.createElement('div');
    map.appendChild(snakeImg[snakeLength - 1]);
    snakeImg[snakeLength - 1].style.width = `${tileSize}px`;
    snakeImg[snakeLength - 1].style.height = `${tileSize}px`;
    snakeImg[snakeLength - 1].style.backgroundColor = 'blue';
    snakeImg[snakeLength - 1].style.position = 'absolute';
    snakeImg[snakeLength - 1].style.zIndex = '999';
    snakeImg[snakeLength - 1].style.top = (this.y - 1) * tileSize + 'px';
    snakeImg[snakeLength - 1].style.left = (this.x - 1) * tileSize + 'px';
    snakeImg[snakeLength - 1].style.display = 'none';
    appleCoords.splice(appleCoords.indexOf([this.x, this.y]), 1);
}
var appleImg, appleCoords = []; // create apple
for (var i = 1; i <= mapSize; i++) {
    for (var j = 1; j <= mapSize; j++) {
        appleCoords.push([j, i]);
    }
}
function Apple(x, y) {
    this.x = x;
    this.y = y;
    appleImg = document.createElement('div');
    map.appendChild(appleImg);
    appleImg.style.width = `${tileSize}px`;
    appleImg.style.height = `${tileSize}px`;
    appleImg.style.backgroundColor = 'red';
    appleImg.style.position = 'absolute';
    appleImg.style.zIndex = '998';
    appleImg.style.top = (this.y - 1) * tileSize + 'px';
    appleImg.style.left = (this.x - 1) * tileSize + 'px';
}
snakePart.push(new snake((mapSize + 1) / 2, (mapSize + 1) / 2)); // the snake head
snakeImg[0].style.display = 'block';
snakeImg[0].style.backgroundColor = 'black';
var apple = new Apple(appleCoords[Math.floor(Math.random() * (appleCoords.length))][0], appleCoords[Math.floor(Math.random() * (appleCoords.length))][1]);
console.log(apple.x, apple.y);
var keyOn;
document.addEventListener('keydown', function(keyPressed) { // event listener
    if (keyOn === undefined) {
        keyOn = keyPressed.key;
    }
    switch(keyOn){
        case 'w':
            if (keyPressed.key !== 's') {
                keyOn = keyPressed.key;
            }
            break;
        case 's':
            if (keyPressed.key !== 'w') {
                keyOn = keyPressed.key;
            }
            break;
        case 'a':
            if (keyPressed.key !== 'd') {
                keyOn = keyPressed.key;
            }
            break;
        case 'd':
            if (keyPressed.key !== 'a') {
                keyOn = keyPressed.key;
            } 
            break;
    }
})
var speed = 7; // moving the snake
function move() {
    for (var i = snakeLength - 1; i > 0; i--) {
        snakeImg[i].style.display = 'block';
        snakePart[i].x = snakePart[i - 1].x;
        snakePart[i].y = snakePart[i - 1].y;
        snakeImg[i].style.top = (snakePart[i].y - 1) * tileSize + 'px';
        snakeImg[i].style.left = (snakePart[i].x - 1) * tileSize + 'px';
    }
    console.log(snakePart);
    if (keyOn === 'w') {
        snakePart[0].y--;
        if (snakePart[0].y === 0) {
            snakePart[0].y = mapSize;
        }
    }
    if (keyOn === 's') {
        snakePart[0].y++;
        if (snakePart[0].y > mapSize) {
            snakePart[0].y = 1;
        }
    }
    if (keyOn === 'a') {
        snakePart[0].x--;
        if (snakePart[0].x === 0) {
            snakePart[0].x = mapSize;
        }
    }
    if (keyOn === 'd') {
        snakePart[0].x++;
        if (snakePart[0].x > mapSize) {
            snakePart[0].x = 1;
        }
    }
    snakeImg[0].style.top = (snakePart[0].y - 1) * tileSize + 'px';
    snakeImg[0].style.left = (snakePart[0].x - 1) * tileSize + 'px';
    if (appleCoords.indexOf([snakePart[0].x, snakePart[0].y]) > -1) {
        appleCoords.splice(appleCoords.indexOf([snakePart[0].x, snakePart[0].y]), 1);
    }
    appleCoords.push([snakePart[snakeLength - 1].x, snakePart[snakeLength - 1].y]);
    if (snakePart[0].x === apple.x && snakePart[0].y === apple.y) {
        snakePart.push(new snake(apple.x, apple.y));
        apple.x = appleCoords[Math.floor(Math.random() * (appleCoords.length))][0];
        apple.y = appleCoords[Math.floor(Math.random() * (appleCoords.length))][1];
        appleImg.style.top = (apple.y - 1) * tileSize + 'px';
        appleImg.style.left = (apple.x - 1) * tileSize + 'px';
    }
}
setInterval(move, 1000 / speed);

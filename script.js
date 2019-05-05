var side = 25;
var xotArr = [];
var eatArr = [];
var predatorArr =[];
var ghostArr = [];
var enemyArr = [];
var bardz = 25;
var layn = 50;
var grassCount = 150;
var eatGrassCount = 15;
var predatorCount = 5;
var enemyCount = 5;
var matrix = [];

for (var i = 0; i < bardz; i++) {
    matrix.push([]);
    for (var j = 0; j < layn; j++) {
        matrix[i].push(0);
    }
}

function setup() {
    var n = 0;
    while (n < grassCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            n++;
        }
    }
    
    n = 0;
    while (n < eatGrassCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            n++;
        }
    }

    n = 0;
    while (n < predatorCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            n++;
        }
    }

    n = 0;
    while (n < enemyCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            n++;
        }
    }
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            } else if (matrix[y][x] == 4) {
                var enemy = new Enemy(x, y);
                enemyArr.push(enemy);
            }
        }
    }
}

function draw() {
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
            } else if (matrix[i][j] == 2) {
                fill("orange");
            } else if (matrix[i][j] == 3) {
                fill("blue");
            } else if (matrix[i][j] == 4) {
                fill("red");
            } else if (matrix[i][j] == 5) {
                fill("white");
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
            }
            rect(j * side, i * side, side, side);
        }
    }

    for (var i in xotArr) {
        xotArr[i].mul();
    }

    for (var i in eatArr) {
        eatArr[i].eat();
    }

    for (var i in enemyArr) {
        enemyArr[i].eat();
    }

    for (var i in predatorArr) {
        predatorArr[i].eat();
    }

    for (var i in ghostArr) {
        ghostArr[i].move();
    }
    if(xotArr.length == 0 && eatArr.length == 0 && enemyArr.length == 0 && predatorArr.length == 0 && ghostArr.length == 0){
        alert("GAME OVER");
    }
}
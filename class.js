class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [];

    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        if (this.multiply == 10) {
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                var norXot = new Grass(x, y);
                xotArr.push(norXot);

                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}

class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 3;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    eat() {
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            if (this.multiply == 3) {
                this.mul()
                this.multiply -= 3;
            }

        } else { 
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);
        if (cord){
            var x = cord[0];
            var y = cord[1];
            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);
            matrix[y][x] = 2;
            this.multiply = 0;
        } 
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }
}

class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 20;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    eat() {
        var fundCords = this.getDirections(2);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            if (this.multiply == 8) {
                this.mul()
                this.multiply = 0;
            }

        } else { 
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
        if(this.energy < 5){
            var fundCords = this.getDirections(1);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;

                this.multiply += 0,75;

                this.energy += 0,5;

                for (var i in xotArr) {
                    if (x == xotArr[i].x && y == xotArr[i].y) {
                        xotArr.splice(i, 1);
                    }
                }

                if (this.multiply == 8) {
                    this.mul()
                    this.multiply = 0;
                }
            } else { 
                this.move();
                this.energy--;
                if (this.energy <= 0) {
                    this.die();
                }
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);
        if (cord){
            var x = cord[0];
            var y = cord[1];
            var newPredator = new Predator(x, y);
            predatorArr.push(newPredator);
            matrix[y][x] = 3;
            this.multiply = 0;
        } 
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 10;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    eat() {
        var fundCords = this.getDirections(2);
        var Cordss = this.getDirections(3);
        fundCords.concat(Cordss);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var z = matrix[y][x];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;
            if(z == 2){
                for (var i in eatArr) {
                    if (x == eatArr[i].x && y == eatArr[i].y) {
                        eatArr.splice(i, 1);
                    }
                }
            }
            else{
                for (var i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                    }
                }
            }
            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            if (this.multiply == 6) {
                this.mul()
                this.multiply = 0;
            }

        } else { 
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);
        if (cord){
            var x = cord[0];
            var y = cord[1];
            var newEnemy = new Enemy(x, y);
            enemyArr.push(newEnemy);
            matrix[y][x] = 4;
            this.multiply = 0;
        } 
    }

    die() {
        matrix[this.y][this.x] = 5;
        var ghost = new Ghost(this.x,this.y);
        ghostArr.push(ghost);
        for (var i in enemyArr) {
            if (this.x == enemyArr[i].x && this.y == enemyArr[i].y) {
                enemyArr.splice(i, 1);
            }
        }
    }
}

class Ghost {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 3;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;
            if(this.energy <= 0){
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 1;
        var grass = new Grass(this.x, this.y);
        xotArr.push(grass);
        if(matrix[this.x - 1, this.y - 1] == 0){
            matrix[this.x - 1, this.y - 1] = 1;
            var grass = new Grass(this.x - 1, this.y - 1);
            xotArr.push(grass);
        } if(matrix[this.x, this.y - 1] == 0){
            matrix[this.x, this.y - 1] = 1;
            var grass = new Grass(this.x, this.y - 1);
            xotArr.push(grass);
        } if(matrix[this.x + 1, this.y - 1] == 0){
            matrix[this.x + 1, this.y - 1] = 1;
            var grass = new Grass(this.x + 1, this.y - 1);
            xotArr.push(grass);
        } if(matrix[this.x - 1, this.y] == 0){
            matrix[this.x - 1, this.y] = 1;
            var grass = new Grass(this.x - 1, this.y);
            xotArr.push(grass);
        } if(matrix[this.x + 1, this.y] == 0){
            matrix[this.x + 1, this.y] = 1;
            var grass = new Grass(this.x + 1, this.y);
            xotArr.push(grass);
        } if(matrix[this.x - 1, this.y + 1] == 0){
            matrix[this.x - 1, this.y + 1] = 1;
            var grass = new Grass(this.x - 1, this.y + 1);
            xotArr.push(grass);
        } if(matrix[this.x, this.y + 1] == 0){
            matrix[this.x, this.y + 1] = 1;
            var grass = new Grass(this.x, this.y + 1);
            xotArr.push(grass);
        } if(matrix[this.x + 1, this.y + 1] == 0){
            matrix[this.x + 1, this.y + 1] = 1;
            var grass = new Grass(this.x + 1, this.y + 1);
            xotArr.push(grass);
        }

        for (var i in ghostArr) {
            if (this.x == ghostArr[i].x && this.y == ghostArr[i].y) {
                ghostArr.splice(i, 1);
            }
        }
    }
}
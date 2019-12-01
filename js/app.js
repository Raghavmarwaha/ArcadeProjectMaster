var Enemy = function(x, y) {
    this.x = x;//x coordinate
    this.y = y; //y coordinatye
    this.sprite = 'images/enemy-bug.png';//images of bug
    this.speed = this.enemySpeed();//speed calculating formula
};

var MAX_SPEED = 450;//maximum speed
var MIN_SPEED = 100; //minimum speed

Enemy.prototype.update = function(dt) {
        this.x = this.x + this.speed * dt;
         if(this.x>550)//when the bug reachers at the end of the edge
         {
        this.x = -70; //new bug appears at left edge
        this.speed = this.enemySpeed();
    }
};

Enemy.prototype.enemySpeed = function() {
    return Math.floor(Math.random() * (MAX_SPEED) + MIN_SPEED); //speed of enemy bugs
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);//how to draw image of enemy bugs
};

var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';//image of the player
    this.x = x;//x co-ordinate
    this.y = y;//y coordinate
};

var lives = 5;//total lives
var score = 0;//intitalise score to 0
var win = 75;//when score=125,you win the game

Player.prototype.update = function() {
    for (var i = 0; i <4; i++) {

        if ((this.x > allEnemies[i].x - 70) && (this.x < allEnemies[i].x + 70) && (this.y == allEnemies[i].y)) {//checking collision
            lives--;
                alert("you left only " + lives + " lives ");
            this.reset();
        }

    }

};

Player.prototype.reset = function() {
    if (lives === 0) {//when lives become 0 you loose the game
        document.write("YOU LOOSE THE GAME"+"<br>"+"<br>"+"<br>");
                 document.write("LET'S TRY AGAIN"+"<br>"+"<br>"+"<br>");
                 document.write("TO PLAY 1 TIME MORE,REFREST THE PAGE"+"<br>"+"<br>");
                 document.write("ENJOY IT!");

    }
    this.x = 100;//reset to position x
    this.y = 400;//reset to position y

};

Player.prototype.render = function() {
    this.renderDisplayScore();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);//draw image of player
};


Player.prototype.handleInput = function(keypress) {
    if (keypress === 'left')
     {
        if (this.x > 0)
         {
            this.x -=100;//movement stops at last left
        }
    }
    if (keypress === 'up')
     {
        if (this.y > 40)
         {
            this.y -=90;//movement stops at water
        } else {

            score = score + 25;
            if (score === win) {//when our score reaches to win points
                 document.write("YOU WIN THE GAME"+"<br>"+"<br>"+"<br>");
                 document.write("LET'S TRY AGAIN"+"<br>"+"<br>"+"<br>");
                 document.write("TO PLAY 1 TIME MORE,REFREST THE PAGE"+"<br>"+"<br>");
                 document.write("ENJOY IT!");
            }
            this.reset();
        }

    }
    if (keypress ==='right')
     {
        if (this.x < 400)
        {
            this.x +=100;//movement stops at last right
        }
    }
    if (keypress === 'down')//movement stops at end of grass
    {
        if (this.y < 400)
         {
            this.y += 90;
        }
    }
};

Player.prototype.renderDisplayScore = function() {
    // Display Score and  lives
  ctx.fillStyle = 'black';
    ctx.fillRect( 0, 0, 505,50);
    ctx.strokeStyle="white";
    ctx.fillStyle = '#000000';
    ctx.font = "15px italic";
    ctx.strokeText(" SCORE: ", 15, 25);
    ctx.strokeText("LIVES: ", 250, 25);
    ctx.font = "15px italic";
    ctx.strokeText(score, 90, 25);
    ctx.strokeText(lives, 320, 25);


};
//created all enemies array of new enemy object
var allEnemies = [
    new Enemy(0, 50),
    new Enemy(100,40),
    new Enemy(0, 130),
    new Enemy(0, 220),
];

var player = new Player(100, 400);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
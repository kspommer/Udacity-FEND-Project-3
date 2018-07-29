// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Rock.png';
    // starting position of the heart crushing rock
    // render function multiplies x by 101, y by 83 
    // for proper canvas placement
    this.x = x;     
    this.y = y;
    // set speed using random number generator
    // experimented to find range that acheieved
    // speed where user can both see and 
    // reasonably take actions to avoid the rocks
    // this.speed = Math.floor(Math.random() * (max-min)) + min
    this.speed = (Math.floor(Math.random() * 5) + 1);   
}

// function to get current enemy X position 
Enemy.prototype.getX = function(enemy) { 
    return this.x;
} 

// functions to get current enemy Y position 
Enemy.prototype.getY = function(enemy) { 
    return this.y;
} 

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Check if enemy is on the canvas
    // if on canvas, move in x direction  
    if (0 <= this.x < 5) {
        // speed = distance / time ==> 
        // distance = speed * time 
        this.x = this.x + (this.speed*dt);
        // if enemy in last tile in row, 
        // reset to first position
        // new speed generated
        if (this.x > 5) { 
            this.x = 0; 
            this.speed = (Math.floor(Math.random() * 5) + 1);
        }
    }        
}; 

// if enemy in last tile in row, 
// reset to first position
// new speed generated
Enemy.prototype.reset = function() {
    this.x = 0; 
    this.speed = (Math.floor(Math.random() * 5) + 1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // added an offset as image is in lower part of 101 x 171 tile
    const yOffset = 20; 
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83-yOffset);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // constructor function
    // display heart image for the player
    this.sprite = 'images/Heart.png';
    // position the player on the board
    // consider board a 5 x 6 matrix (x: 0-4; y: 0-5)
    this.x = x;
    this.y = y;
}

// function to get current X position 
Player.prototype.getX = function() { 
    return this.x;
}; 

// function to get current Y position 
Player.prototype.getY = function() { 
    return this.y;
}; 

// function to set current X position 
Player.prototype.setX = function(startX) { 
    this.x = startX;
}; 

// function to set current Y position 
Player.prototype.setY = function(startY) { 
    this.y = startY;
}; 

// this function resets the player
// back to the home position 
Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5; 
}

Player.prototype.handleInput = function(key) {
    // if right arrow hit, increase x position by 1
    if (key == 'right') {
        this.x = this.x + 1;
    }
    // if left arrow hit, decrease x position by 1
    else if (key == 'left') {
        this.x = this.x - 1;
    }
    // if up arrow hit, reduce by position by 1
    else if (key =='up') {
        this.y = this.y - 1;
    }
    // if down arrow hit, increase by position by 1
    else if (key == 'down') {
        this.y = this.y + 1;
    }    
}

// this function updates the player location 
// based on player's arrow keystrokes
// function checks player location and 
// does not allow it to be moved off the board
// function calls collision function 
Player.prototype.update = function() {
    // if outside of x or y canvas limits
    // adjust this.x / this.y so stays in limits
    if (this.x < 0) {
        this.x = this.x + 1; 
        this.y = this.y; 
    }
    else if(this.x > 4) { 
        this.x = this.x - 1;
        this.y = this.y;  
    }
    else if (this.y < 0) {
        this.x = this.x; 
        this.y = this.y + 1; 
    }
    else if (this.y > 5) { 
        this.x = this.x; 
        this.y = this.y - 1; 
    }
    // this statement checks to see if player
    // at y = 0, which is a WIN!
    else if (this.y == 0) {
        // Launch congrats modal
        congratsPopup(); 
        // Pause update / render functions
        // if don't pause, modal close will not work
        pauseGame(); 
    } 
}    

// this function renders the player sprite/image 
// on the canvas area
Player.prototype.render = function() { 
    // draw the player on the screen
    // required method for game
    // player always moves at same speed
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83);
} 

// call this function when player hits water
// launch modal with message and play again 
function congratsPopup() {
    setTimeout(function() {
        // Get the modal
        var modal = document.getElementById("myModal");
        // Get the paragraph in the modal
        var modalParagraph = document.getElementById("modalText");
        var line1 = "Yeah!  Your heart was not crushed!" + "<br>";
        var line2 = "Do you want to play again?" + "<br>" + "<br>";
        var line3 = "If not, simply close the browser to end play."
        // Add content to the <p class=modalText> element
        modalParagraph.innerHTML = (line1 + line2 + line3);
        // Open the modal
        modal.style.display = "block";
    }, 400);
}

// function to close the modal
function closeModal() {
    modal.style.display = "none";  
}

// function to change boolean variable to stop game
function pauseGame() {
    stopped = true; 
}
// function to change boolean variable to restart game
function rollGame() {
    stopped = false; 
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// set pause variable default
var stopped = false; 

// create an array to hold the enemies 
var allEnemies = []; 

// construct three enemies
// position an enemy in the 
// first column of each stone row
var enemy1 = new Enemy(0, 1);
var enemy2 = new Enemy(0, 2);
var enemy3 = new Enemy(0, 3);

// add each enemy to enemy array
allEnemies.push(enemy1); 
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// construct the player
// original location x = 2; y = 5
var player = new Player(2, 5); 

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
// This function was provided; not modified
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }; 
    player.handleInput(allowedKeys[e.keyCode]);
});

// Get the <span> element that closes the modal 
var closeButton = document.querySelector(".close");

// Get the button element that restarts the game 
var restartGame = document.querySelector(".playAgain");

// Get the modal element 
var modal = document.getElementById("myModal");

// If user clicks on <span>(X), close the modal
closeButton.addEventListener("click", function() {
    closeModal(); 
});

// If user clicks restart game button, refresh board/counter/timer
restartGame.addEventListener("click", function() {
    player.reset();
    closeModal();
    rollGame();  
});
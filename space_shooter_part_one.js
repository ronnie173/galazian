let imageRepository = new function () {
    //defines images
    this.background = new Image();
    this.background.src = "images/bg.png";
};

function Drawable() {
    this.init = function (x, y) {
        this.x = x;
        this.y = y;
    }
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this.draw = function () {

    }
}

/*
 * Gets canvas information and context and sets up all game
 * objects.
 * Returns true if the canvas is supported and false if it
 * is not. This is to stop the animation script from constantly
 * running on older browsers.
 */
function Game() {
    this.init = function () {
   //get the canvas element
        this.bgCanvas = document.getElementById('background');
        //Test to see if canvas is supported
        if (this.bgCanvas.getContext){
            this.bgContext = this.bgCanvas.getContext('2d');
            //Initialize objects to contain their context and canvas information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            // Initialize the background object
            this.background = new Background();
            this.background.init(0,0); // Set draw point to 0,0
            return true;
        }else{
            return false;
        }
    };
    //Start the animation loop
    this.start = function () {
        animate();
    }
}
/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
    requestAnimationFrame(animate);
    game.background.draw();

}

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimationFrame(function () {
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||

});

function Background() {
    this.speed = 1;

    this.draw = function () {
        //Pan the background
        this.y += this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y);
        //draw another image at the top edge of the first image
        this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

        //if the image scrolled off the screen, reset it
        if (this.y >= this.canvasHeight)
            this.y = 0;
    }
}

//Set Background to inherit properties from drawable
Background.prototype = new Drawable();
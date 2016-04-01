/*
Surin Rao  Mar 31 2016  Atari
Super helpful: http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/
*/

//-------------------------------Variables -------------------------------------
/*
These are my global variables, I also created the colours
*/
var ColRay = ["#cc0000", "#ff9900", "#ffff00", "#009933", "#0000ff", "#4b0082"];
//							 red0-		orange1-		yellow2-	green3-			blue4-		indigo5
//googled the colours, put into an array to be more efficient
var white = "#ffffff";
var pink = "#ff0066";

var canvas = document.getElementById("myCanvas"); //this is the canvas
var ctx = canvas.getContext("2d");
var PaddleHeight = 8; //paddle height
var PaddleWidth = 100; //width
var StartingX = (canvas.width-PaddleWidth)/2; //where the paddle starts
var StartingY = 592;
var Right = false; //will it move
var Left = false;
var PaddleDisplacement = 5; //how much the paddle will move
var BallRadius = 10; //ball size
var BallX = 400; //ball starting coords
var BallY = 500;
var BallDisplacementX = 3; //how much the balls x coord will change
var BallDisplacementY = -2; //y coord change
var x = canvas.width/2;
var y = canvas.height-30;
var Columns = 15;
var Rows = 6;
var BrickWidth = 75;
var BrickHeight = 18;
var brickPadding = 1;
var brickOffsetTop = 100;
var brickOffsetLeft = 1;
var score = 0;
var lives = 1;

var bricks = [];
for(var c=0; c<Rows; c++) {
    bricks[c] = [];
    for(var r=0; r<Columns; r++) {
        bricks[c][r] = {BallX: 0,BallY: 0, status: 1 };
    }
}

//------------------------------Make Background---------------------------------
/*
This is the background on the canvas,
*/
function Background() {
	ctx.beginPath();
	ctx.rect(0, 0, 1140, 600);
	ctx.fillStyle = "black";
	ctx.fill();
}//Background

//------------------------------Make Paddle-------------------------------------
/*
THis is creating the actual paddle
*/
function Paddle() {
    ctx.beginPath();
    ctx.rect(StartingX, StartingY, PaddleWidth, PaddleHeight);
    ctx.fillStyle = pink;
    ctx.fill();
    ctx.closePath();
}//Paddle

//------------------------------KeyPressed/Released-----------------------------
/*
I got the boolean Right and Left idea from this website: https://goo.gl/mGVKNJ
I had a different way of doing it, but this makes the paddle move smoother,
My way was less smooth, but the paddle still moved:
(if... StartingX += PaddleDisplacement) was my way but too choppy
*/

function KeyPressed(e) {
    if(e.keyCode == 39) {
        Right = true; //if the right arrow is pressed, sets it true
    }//if
    else if(e.keyCode == 37) {
        Left = true;
    }//else if
}//Pressed

function KeyReleased(e) {
    if(e.keyCode == 39) {
        Right = false; //if Released then false again
    }//if
    else if(e.keyCode == 37) {
        Left = false;
    }//else if
}//Released

//----------------------Drawing the Ball----------------------------------------
/*
This is where I draw the ball, with its properties
*/
function Ball() {
	ctx.fillStyle = white;
	ctx.beginPath();
	ctx.arc(BallX, BallY, BallRadius, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.closePath();
	BallX += BallDisplacementX;
	BallY += BallDisplacementY;
}//Ball

//------------------------Collision---------------------------------------------
/*
When the ball its a brick play this sound:
When the ball hits the paddle play this sound:
got from this site: https://goo.gl/Vh1UGD
*/
function collisionDetection() {
    for(var c=0; c<Rows; c++) {
      for(var r=0; r<Columns; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(BallX > b.x &&BallX < b.x+BrickWidth &&BallY > b.y &&BallY < b.y+BrickHeight) {
            BallDisplacementY = -BallDisplacementY;
              b.status = 0;
              score+=10;
              if(score == 900) {
              	alert("YOU WIN, CONGRATS!");
                document.location.reload();
              }//if score
          }//if .x checking Bricks
        }//status
			}//r
  }//c
}//collisionDetection

//---------------------------------- Bricks-------------------------------------
/*
Used this idea for the link game we made a while ago
I expanded on the algo Charlie made after the link test and applied it here
The Row Colour change I had trouble with because
I had it in the other for loop which was why the colours didn't change
Got lines 152-156 from https://goo.gl/5SDgyz
152-156 is what got the collsion working
*/
function Bricks() {
	for(var c=0; c<Rows; c++) {
		ctx.fillStyle = ColRay[c];
			for(var r=0; r<Columns; r++) {
					if(bricks[c][r].status == 1) {
							var brickX = (r*(BrickWidth+brickPadding))+brickOffsetLeft;
							var brickY = (c*(BrickHeight+brickPadding))+brickOffsetTop;
							bricks[c][r].x = brickX;
							bricks[c][r].y = brickY;
							ctx.beginPath();
							ctx.rect(brickX, brickY, BrickWidth, BrickHeight);
							ctx.fill();
							ctx.closePath();
					}
			}
	}
/*
	for(var i=0; i< 6; i++) {
		ctx.fillStyle = ColRay[i]; //put the fill here
		for(var j=0;j<16;j++) {
			ctx.beginPath();
			ctx.rect((j * 76) + 1,100+(i * 19) + 2, 75, 18);
			ctx.fill();
			ctx.closePath();
		}//j
	}//i
*/
}//Bricks()

//------------------Colliding with Outer Box------------------------------------
/*
This is for when the Ball hits the outside walls and the top
*/
function BoxCollision() {
	if(BallX+BallDisplacementX >1130 || BallX+ BallDisplacementX+ BallRadius <0) {
		BallDisplacementX = -1.05*BallDisplacementX;
		BallDisplacementY = 1.05*BallDisplacementY;
	}

	if (BallY + BallDisplacementY - BallRadius < 0) {
		BallDisplacementY = -1.05*BallDisplacementY;
	}

}//BoxCollision

//----------------Colliding with the Paddle-------------------------------------
/*
This is when the ball hits teh paddle, and if it misses then G.O.
*/
function PaddleCollision() {

	if (BallY + BallDisplacementY > 589) {
		if(BallX > StartingX && BallX < StartingX + 100) {
			BallDisplacementY = -0.95*BallDisplacementY;
			BallDisplacementX = 12 * ((BallX-(StartingX+PaddleWidth/2))/PaddleWidth);
		} //nested
	}//if

	if(BallY > 600) {
		alert("GAME OVER");
		location.reload(); //this reloads the page, got from:  https://goo.gl/mGVKNJ
	}//if
}//PaddleCollision

//---------------------------Moving the Paddle----------------------------------
/*
This is when the key is pressed, it makes the varible true,
then if its true then the paddle will move
*/
function Move() {

    if(Right == true) {
				if(StartingX < 1040) {//width-paddle length because x coord at far Right
        	StartingX += PaddleDisplacement;
    		} //if
		}// if right

    else if(Left == true) {
				if(StartingX > 0) { //nested if statement
					StartingX -= PaddleDisplacement;
    		} //if
		}// if left

} //Move

//---------------------Clearing ------------------------------------------------
/*
This is for clearing teh canvas so we don't have any "residue" (ball stays)
*/
function clear() {
	ctx.clearRect(0, 0, 1140, 600);
}//clear

//---------------------------Draw the Score on the Canvas-----------------------
/*
This will draw the score in the top left of the canvas in pink size 20
got from http://goo.gl/rTL3Yo
*/
function Score() {
	ctx.font = "20px Arial";
	 ctx.fillStyle = pink;
	 ctx.fillText("Score: "+score, 0, 20);
}//Score

//---------------------------Draw everything all functions----------------------
/*
This is drawing everything
*/
function draw() {

		clear();
	 	Background(); //sequential so need to draw this first
    Paddle();
		BoxCollision();
		PaddleCollision();
		Ball(); //sequential
    Move();
		Bricks();
		collisionDetection();
		Score();

}//draw

window.addEventListener("keydown", KeyPressed,true);
window.addEventListener("keyup", KeyReleased,true);
setInterval(draw,8);

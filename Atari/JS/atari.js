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
var score=0;
var drawseven = true;

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
*/






//---------------------------------- Bricks-------------------------------------
/*
Used this idea for the link game we made a while ago
I expanded on the algo Charlie made after the link test and applied it here
The Row Colour change I had trouble with because
I had it in the other for loop which was why the colours didn't change
*/
function Bricks() {

	for(var i=0; i< 6; i++) {
		ctx.fillStyle = ColRay[i]; //put the fill here
		for(var j=0;j<16;j++) {
			ctx.beginPath();
			ctx.rect((j * 76) + 1,100+(i * 19) + 2, 75, 18);
			ctx.fill();
			ctx.closePath();
		}//j
	}//i

	if(drawseven == true){
		BricksRow7();
	}//if

   function BricksRow7() {
    ctx.beginPath();
    ctx.rect(1, 216, 1138, 18);
  	ctx.fillStyle = white;
    ctx.fill();
  	ctx.closePath();
   }//row7

	if(BallX >0 &&BallX < 1140) {
		if(BallY + BallDisplacementY == 236) {
			if(drawseven = true) {
				BallDisplacementY = -BallDisplacementY;
				drawseven = false;
				score+=100;
			}//if drawseven

		}//if Y
	}//if X

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
		Score();
		if(score==1000){
 		 alert("WIn")
		 location.reload();
 	 }
}//draw

window.addEventListener("keydown", KeyPressed,true);
window.addEventListener("keyup", KeyReleased,true);
setInterval(draw,8);

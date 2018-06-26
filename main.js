var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//1.Constants
var interval;
var frames = 0;
//here we save an array of colors that we can assign randomly as a text to the first word and as a font color to the second word
var colors = ["black", "yellow", "orange", "red", "blue", "purple"]
var random1 = Math.floor(Math.random() * colors.length);
var random2 = Math.floor(Math.random() * colors.length);
//we can save the images that we are going to use here
var images = {
  bg: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

//2.Classes
class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;
    this.image = new Image();
    this.image.src = images.bg;
    this.image.onload = function() {
      this.draw();
    }.bind(this);
  }
  draw(){ //we draw the image outside the constructor, but inside our class, we include the timer and the scores 
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
    //score player 1
    ctx.font = '48px Avenir';
    ctx.fillStyle = 'white';
    ctx.fillText(this.scorePlayer1, 900, 50);
    //score player 2
    ctx.font = '48px Avenir';
    ctx.fillStyle = 'white';
    ctx.fillText(this.scorePlayer2, 950, 50);
    //timer
    // ctx.font = '60px Avenir';
    // ctx.fillStyle = 'black';
    // ctx.fillText("00", 200, 200);
  }
}

class Text {
  constructor(y, color, text) {
    this.x = (canvas.width / 3) - 80;
    this.y = y;
    this.width = 200;
    this.height = 100;
    this.color = color;
    this.text = text;
  }
  draw() {   
    ctx.fillStyle = this.color;
    ctx.font = '60px Avenir'; 
    ctx.fillText(this.text, this.x, this.y); 
  } 
}

// class Card {
//   constructor(y, color) {
//     this.x = 100;
//     this.y = y
//     this.width = 200;
//     this.height = 100;
//     this.color = color ? color : 'white';
//   }
//   draw() {
//     ctx.beginPath();
//     ctx.strokeStyle = "white";
//     ctx.arc(this.x, this.y, 200, Math.PI, Math.PI * 2, true);
//     ctx.stroke();
//     ctx.closePath();    
//   } 
// }


//3.Instances
var board = new Board();
var text1 = new Text(300, "black", generateColor1());
var text2 = new Text(400, generateColor2(), generateColor2());
var timer = new Text(500, "black", "00");
//var score1 = new Text(20, );

//4.Main f(x)s
function update() {
  //frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height) //siempre borra primero
  board.draw();
  text1.draw();
  text2.draw();
  timer.draw();
}

function start() {
  interval = setInterval(update, 1000/60);
}

//5.Aux f(s)s
function generateColor1() {
  return colors[random1];
}
function generateColor2() {
  return colors[random2];
}

//6.Listeners 
document.getElementById("start").addEventListener('click', function(){
  //7.Start the game
  start();
});

document.getElementById("yes").addEventListener('click', function(e){
console.log(e);
});

document.getElementById("no").addEventListener('click', function(e){
  console.log(e);
});

addEventListener('keydown', function(e) {
  switch(e.keyCode) {
    case 37:
    console.log(e.keyCode);  
    //no arraw left
      break;
    case 39:
    console.log(e.keyCode); 
    //yes arrow right
      break;
  }
});

//levels?
//As soon as the start button or the enter key are pressed, the game begins
//That means the set of cards are displayed and the explaining widgets that give the user a hint of how to play 
//prompt are your ready? yes no
//if yes start the timer
//case 1:
//if the first text coincides with the color of the second text the user should click the yes button or the right arrow
//being that correct, a point is added to the score board, there is a unicorn or a fish or a turtle, and the next set of cards is 
//presented
//case 2:
//if the text does not match the color of the second text, there is no point added and it gets a cross or a down thumb
//when the timer finishes, is congratulated and the score it got, invites the second player to come in
//the same happens to the second player, when he finishes the board announces the winner 

//30 seconds it's the first setTimeout
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//1.Constants
var interval;
var frames = 0;
//here we save an array of colors that we can assign randomly as a text to the first word and as a font color to the second word
var colors = ["black", "yellow", "orange", "red", "blue", "purple"];
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
  }
}

class Text {
  constructor(x, y, color, text) {
    this.x = x;
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

//3.Instances
var board = new Board();
var text1 = new Text(canvas.width/2 - 100, 300, "black", generateColor());
var text2 = new Text(canvas.width/2 - 100, 400, generateColor(), generateColor());
var timer = new Text(canvas.width/2 - 100, 500, "black", "00");
var score1 = new Text(900, 60, "white", 0);
var score2 = new Text(980, 60, "white", 0);

//4.Main f(x)s
function update() {
  if (frames <= 30) {
    timer.text = frames;  
    frames++;
  } else {
    return;
  } 
  ctx.clearRect(0, 0, canvas.width, canvas.height) //siempre borra primero
  board.draw();
  text1.draw();
  text2.draw();
  timer.draw();
  score1.draw();
  score2.draw();
}

function start() {
  interval = setInterval(update, 1000);
  //console.log(interval)
}

//5.Aux f(s)s
function generateColor() {
  return colors[ Math.floor(Math.random() * colors.length)];
}
// function generateColor2() {
//   return colors[ Math.floor(Math.random() * colors.length)];
// }

function checkIfCorrect(answer) {
  if(text1.text === text2.color && answer === true) {
    score1.color = "green";
    score1.text++;
    keepPlaying();  
  } else if(text1.text === text2.color && answer === false) {
    score1.color = "red";
    keepPlaying(); 
  } else if(text1.text !== text2.color && answer === true) {
    score1.color = "red";
    keepPlaying();
  } else if(text1.text !== text2.color && answer === false) {
    score1.color = "green";
    score1.text++;
    keepPlaying(); 
  }
}

function keepPlaying() {
  text1.text = generateColor();
  text2.color = generateColor();
  text2.text = generateColor();
} 

function game2() {

}


//6.Listeners 
addEventListener('keydown', function(e) {
  switch(e.keyCode) {
    case 32: 
    start();
    document.getElementById('start').innerHTML = 'Player 2';
    break;
    case 37: //arrow left no 
    checkIfCorrect(false);
    break;
    case 39: //arrow right yes 
    checkIfCorrect(true);
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

// document.getElementById("start").addEventListener('click', function(){
//   //7.Start the game
//   start();
// });

// document.getElementById("yes").addEventListener('click', function(e){
// console.log(e);
// });

// document.getElementById("no").addEventListener('click', function(e){
//   console.log(e);
// });
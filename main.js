var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//1.Constants
var interval;
var frames = 0;
var user;
//here we save an array of colors that we can assign randomly as a text to the first word and as a font color to the second word
var colors = ["black", "yellow", "orange", "red", "blue", "purple"];
//we can save the images that we are going to use here
var images = {
  bg: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=512&w=1024",
};

//2.Classes
class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
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

class Score {
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

class Text extends Score {
  constructor(x, y, color, text) {
    super(x, y, color, text);
  }
  draw() {   
    ctx.fillStyle = this.color;
    ctx.font = '60px Avenir';
    var metrics = ctx.measureText(this.text);
    var width = metrics.width; 
    ctx.fillText(this.text, canvas.width/2 - width/2, this.y); 
  } 
}

class Card {
  constructor(x, y, initialAngle, finalAngle) {
    this.x = x;
    this.y = y
    this.width = 130;
    this.height = 60;
    this.initialAngle = initialAngle;
    this.finalAngle = finalAngle;
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
    ctx.fillStyle = 'rgba(255, 255, 255, .5)';
    ctx.arc(this.x, this.y, 180, this.initialAngle, this.finalAngle, false);
    ctx.fill();
    ctx.closePath();    
  } 
}

//3.Instances
var board = new Board();
var timer = new Score(canvas.width/2 - 29, 55, "black", "00");
var score1 = new Score(850, 60, "white", 0);
var score2 = new Score(950, 60, "white", 0);
var cardTop = new Card(canvas.width / 2, 280, Math.PI, Math.PI * 2);
var cardBottom = new Card(canvas.width / 2, 320, Math.PI * 2, Math.PI);
var text1 = new Text(canvas.width/2 - 90, 210, "black", generateColor());
var text2 = new Text(canvas.width/2 - 90, 400, generateColor(), generateColor());

user = score1;

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
  cardTop.draw();
  cardBottom.draw();
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

function checkIfCorrect(score, answer) {
  if(text1.text === text2.color && answer === true) {
    //soundWin.play();
    score.color = "green";
    score.text++;
    keepPlaying();  
  } else if(text1.text === text2.color && answer === false) {
    //soundLose.play();
    score.color = "red";
    keepPlaying(); 
  } else if(text1.text !== text2.color && answer === true) {
    //soundLose.play();
    score.color = "red";
    keepPlaying();
  } else if(text1.text !== text2.color && answer === false) {
    //soundWin.play();
    score.color = "green";
    score.text++;
    keepPlaying(); 
  }
}

function keepPlaying() {
  text1.text = generateColor();
  text2.color = generateColor();
  text2.text = generateColor();
} 

function player2() {
  //if (frames === 30) {
  clearInterval(interval);
  frames = 0;
  score1.color = "white";
  user = score2;
  keepPlaying();
  //}
}

//6.Listeners 
addEventListener('keydown', function(e) {
  switch(e.keyCode) {
    case 32: 
    start();
    //document.getElementById('start').innerHTML = 'Player 2';
    break;
    case 37: //arrow left no 
    checkIfCorrect(user, false);
    break;
    case 39: //arrow right yes 
    checkIfCorrect(user,true);
    break;
    case 78: 
    player2();
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


// var soundWin = new Howl({
//   src: ['./sounds/bubbles.mp3']
// });
// var soundLose = new Howl({
//   src: ['./sounds/clay.mp3']
// });




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


// class Text {
//   constructor(x, y, color, text) {
//     this.x = x;
//     this.y = y;
//     this.width = 200;
//     this.height = 100;
//     this.color = color;
//     this.text = text;
//   }
//   draw() {   
//     ctx.fillStyle = this.color;
//     ctx.font = '60px Avenir';
//     var metrics = ctx.measureText(this.text);
//     var width = metrics.width; 
//     ctx.fillText(this.text, canvas.width/2 - width/2, this.y); 
//   } 
// }
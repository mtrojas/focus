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
  bg: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=512&w=1024',
  unicorn: './images/unicorn.png',
  star: './images/star.png'
};

var sounds = {
  win: './sounds/bubbles.mp3',
  lose: './sounds/clay.mp3'
}

var soundWin = new Audio();
soundWin.src = sounds.win;
var soundLose = new Audio();
soundLose.src = sounds.lose;

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
    ctx.font = 'bold 80px Avenir';
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

class Player {
  constructor(x, y, img, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = img;
    this.image.onload = function() {
      this.draw();
    }.bind(this);
  }
  draw(){ //we draw the image outside the constructor, but inside our class, we include the timer and the scores 
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
  }
}

//3.Instances
var board = new Board();
var timer = new Score(canvas.width/2 - 29, 55, 'black', '00');
var score1 = new Score(850, 60, 'white', 0);
var score2 = new Score(950, 60, 'white', 0);
var cardTop = new Card(canvas.width / 2, 280, Math.PI, Math.PI * 2);
var cardBottom = new Card(canvas.width / 2, 315, Math.PI * 2, Math.PI);
var text1 = new Text(canvas.width/2 - 90, 210, 'black', generateColor());
var text2 = new Text(canvas.width/2 - 90, 400, generateColor(), generateColor());
var unicorn = new Player(845, 60, images.unicorn, 50, 50);
var star = new Player(945, 65, images.star, 40, 40);

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
  unicorn.draw();
  star.draw();
  afterGame();
}

function start() {
  interval = setInterval(update, 1000);
}

//5.Aux f(x)s
function generateColor() {
  return colors[ Math.floor(Math.random() * colors.length)];
}

function checkIfCorrect(score, answer) {
  if(text1.text === text2.color && answer === true) {
    soundWin.play();
    score.color = "green";
    score.text++;
    keepPlaying();  
  } else if(text1.text === text2.color && answer === false) {
    soundLose.play();
    score.color = "red";
    keepPlaying(); 
  } else if(text1.text !== text2.color && answer === true) {
    soundLose.play();
    score.color = "red";
    keepPlaying();
  } else if(text1.text !== text2.color && answer === false) {
    soundWin.play();
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
  clearInterval(interval);
  frames = 0;
  score1.color = "white";
  user = score2;
  keepPlaying();
  start();
}

function afterGame() {
  if(user == score2 && frames === 30) {
    score2.color = "white";
    if(score1.text > score2.text){
      document.getElementById('winner').innerHTML = 'UNICORN WINS!';
      document.getElementById('keep-practice').innerHTML = 'Keep practicing ; )';
    } else if(score1.text < score2.text){
      document.getElementById('winner').innerHTML = 'STAR WINS!';
      document.getElementById('keep-practice').innerHTML = 'Keep practicing ; )';
    } else if(score1.text === score2.text) {
      document.getElementById('winner').innerHTML = 'GREAT GAME!';
      document.getElementById('keep-practice').innerHTML = 'Keep practicing : )';
    }
  }
}

//6.Listeners 
document.getElementById("start").addEventListener('click', function(){
  //7.Start the game
  start();
});

document.getElementById("player-2").addEventListener('click', function(){
  //Start the second game
  player2();
});

document.getElementById("yes").addEventListener('click', function(){
  checkIfCorrect(user,true);
});

document.getElementById("no").addEventListener('click', function(){
  checkIfCorrect(user, false);
});




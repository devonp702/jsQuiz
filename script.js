//global variables go here
var points = 0;
//functions declared here

//main code body here

// click the start button > add event listener, hide button, start program.
var startBtn = document.querySelector("#start"); //get the start button

startBtn.addEventListener("click", startQuiz); // when click start button do startQuiz function
var play = false;
function startQuiz() { //things that happen when start button is clicked
  startBtn.style.display = "none"; // hide the now useless button
  play = true;
  setTimer(); // start the count down
  getQuestions();
  // anything that starts when button is clicked
}
// library of code question objects
var quizLib = [{ // access a question with quizLib[number], op is option and will be a button, c is the correct answer's child address 
    question: "What is the answer?",
    op1: "A",
    op2: "B",
    op3: "C",
    op4: "D",
    c: "4"
  },
  {
    question: "What is the new answer?",
    op1: "1",
    op2: "2",
    op3: "3",
    op4: "4",
    c: "6"
  }
];

// countdown timer
var timeLeft = 120;
var timeElement = document.getElementById("time");

function setTimer() {
  var timer = setInterval(function () {
    timeLeft--;
    timeElement.textContent = "Seconds Left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      alert("time is up");
      gameOver();
    }
  }, 1000);
}

// function to display question and content
var display = document.getElementById("display");

function displayText(num) {
  var show = quizLib[num];
  display.innerHTML = "<h2></h2><br><button></button><br><button></button><br><button></button><br><button></button>";
  display.childNodes[0].textContent = show.question;
  display.childNodes[2].textContent = show.op1;
  display.childNodes[4].textContent = show.op2;
  display.childNodes[6].textContent = show.op3;
  display.childNodes[8].textContent = show.op4;
  display.children[show.c].setAttribute("data-correct", "true");
}

// WHEN I answer a question THEN I am presented with another question >loop and function
var getClick = display.addEventListener("click", function (e) {
  e.preventDefault;
  return e.target;
});
function getQuestions(){
  for (i = 0; i<quizLib.length; i++) {
    var load = displayText(i);
    var click = getClick;
    console.log(click);
    while (play) {
    load
    if (click.hasAttribute(data-correct)) {
      points++;
    }
    }
  }
  gameOver();
}
// WHEN I answer a question incorrectly THEN time is subtracted from the clock > function if (correct) add point if (incorrect) minus time
// WHEN all questions are answered or the timer reaches 0 THEN the game is over AND I can save my initials and score combine into function
function gameOver(n) {
  display.textContent = "Game Over";
}
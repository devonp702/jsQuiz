//global variables go here
var points = 0; // your score
var pointDisplay = document.querySelector("#score"); // place to show your score
var qidx = null; // quiz index number
var startBtn = document.querySelector("#start"); //get the start button
var timeLeft = 120; // 2 mins to play
var timeElement = document.getElementById("time"); // display timer

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
    question: "DOM stands for...",
    op1: "Direct Object Matrix",
    op2: "District Office Matrons",
    op3: "Document Object Model",
    op4: "Direct Office Model",
    c: "6"
  }
];

//functions declared here
// countdown timer
function setTimer() {
  var timer = setInterval(function () {
    timeLeft--;
    timeElement.textContent = "Seconds Left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
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
  display.childNodes[2].setAttribute("data-correct", "false");
  display.childNodes[4].setAttribute("data-correct", "false");
  display.childNodes[6].setAttribute("data-correct", "false");
  display.childNodes[8].setAttribute("data-correct", "false");
  display.children[show.c].setAttribute("data-correct", "true");
}
// answer a question incorrectly THEN time is subtracted from the clock >  if (correct) add point
function getNext() { //handles question flow and ends the game after last question
  qidx++;
  if (qidx < quizLib.length) {
    displayText(qidx);
  } else {
    gameOver();
  }
}

function addPoints() { //takes care of point display and management
  points++;
  pointDisplay.textContent = points + " Points";
  getNext();
}

// WHEN all questions are answered or the timer reaches 0 THEN the game is over AND I can save my initials and score combine into function
function gameOver() {
  display.textContent = "Game Over";
  //save stuff here
}

//main code body here
startBtn.addEventListener("click", startQuiz); // when click start button do startQuiz function
pointDisplay.textContent = points + " Points";

function startQuiz() { //things that happen when start button is clicked
  startBtn.style.display = "none"; // hide the now useless button
  setTimer(); // start the count down
  qidx = 0; //reset the game
  points = 0;
  displayText(0);
  // the magic where all the clicks in the game take place
  display.addEventListener("click", function (e) {
    e.preventDefault
    if (e.target.matches("button")) {
      if (e.target.getAttribute("data-correct") == "true") {
        addPoints();
      } else {
        console.log("wrong");
        getNext();
      }
    }
  });
}
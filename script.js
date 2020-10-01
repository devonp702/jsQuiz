//global variables go here
var points = 0; // your score
var pointDisplay = document.querySelector("#score"); // place to show your score
var qidx = null; // quiz index number
var startBtn = document.querySelector("#start"); //get the start button
var timeLeft = 120; // 2 mins to play
var timeElement = document.getElementById("time"); // display timer
var display = document.getElementById("display"); //display controls location of interactive area
var gameOn = true;
var uTime = null;
var uScore = null;
var oldScoreHome = document.querySelector("#oldScore");
var oScore = localStorage.getItem("score");
var oName = localStorage.getItem("name");
var oTime = localStorage.getItem("time");

// library of code question objects
var quizLib = [{ // access a question with quizLib[number], op is option and will be a button, c is the correct answer's child address 
    question: "How can you make a section of code that you can use over and over?",
    op1: "DOM transversal",
    op2: "Functions",
    op3: "Snippits",
    op4: "JSON Stringify",
    c: "4"
  },
  {
    question: "DOM stands for...",
    op1: "Direct Object Matrix",
    op2: "District Office Matrons",
    op3: "Document Object Model",
    op4: "Direct Office Model",
    c: "6"
  },
  {
    question: "What can you use to change the html?",
    op1: ".innerHTML",
    op2: ".textContent",
    op3: ".edit",
    op4: ".changeHTML",
    c: "2"
  },
  {
    question: "JSON stands for...",
    op1: "Just Send Over Nachos",
    op2: "Javascript Office node",
    op3: "Java Style Ownership Node",
    op4: "JavaScript Object Notation",
    c: "8"
  },
  {
    question: "Javascript is...",
    op1: "the most popular computer programming language.",
    op2: "also called ECMAScript.",
    op3: "not really used in web development.",
    op4: "the same as Java",
    c: "4"
  },
  {
    question: "Where in the HTML do we put the Javascript?",
    op1: "<link>",
    op2: "<script>",
    op3: "<java>",
    op4: "<head>",
    c: "4"
  },
  {
    question: "what does the alert function do?",
    op1: "Makes the page flash.",
    op2: "Event handler for catching variables",
    op3: "Displays text in a pop up.",
    op4: "Repeats a function.",
    c: "6"
  },
  {
    question: "Which will give a value of true?",
    op1: "x !== 'true'",
    op2: "5 > 2",
    op3: "i++",
    op4: "12 < 6",
    c: "4"
  },
  {
    question: "what will start a valid for loop?",
    op1: "for (i=0; i<10; i++)",
    op2: "for (i=0; i>4; i++)",
    op3: "for (i in array)",
    op4: "for (i=10, i+2, i in team)",
    c: "2"
  },
  {
    question: "How do you write a comment in Javascript?",
    op1: "// like this",
    op2: "'like this'",
    op3: "<!--like this-->",
    op4: "***like this***",
    c: "2"
  }
];

//functions declared here
// countdown timer
function setTimer() {
  var timer = setInterval(function () {
    timeLeft--;
    timeElement.textContent = "Seconds Left: " + timeLeft;
    if (gameOn == false) {
      clearInterval(timer);
    }
    if (timeLeft === 0) { //force game over if timer gets to zero
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

// function to display question and content
function displayText(num) {
  var show = quizLib[num];
  display.innerHTML = "<h2></h2></br><button></button></br><button></button></br><button></button></br><button></button>";
  display.childNodes[0].textContent = show.question; // fill in the blanks
  display.childNodes[2].textContent = show.op1;
  display.childNodes[4].textContent = show.op2;
  display.childNodes[6].textContent = show.op3;
  display.childNodes[8].textContent = show.op4;
  display.childNodes[2].setAttribute("data-correct", "false"); //set all answers false
  display.childNodes[4].setAttribute("data-correct", "false");
  display.childNodes[6].setAttribute("data-correct", "false");
  display.childNodes[8].setAttribute("data-correct", "false");
  display.children[show.c].setAttribute("data-correct", "true"); // set right answer true
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
  uTime = timeLeft;
  uScore = points;
  gameOn = false;
  display.innerHTML = "<h2>Game Over</h2></br><p>You got " + uScore + " points, with " + uTime + " seconds left. Save as your best score? First Name:</p><input id='name' type='text'></input><button id='submit'>Yes</button><p>Type your first name, and hit Save, Refresh to see below!</p>";
}

//main code body here
startBtn.addEventListener("click", startQuiz); // when click start button do startQuiz function
pointDisplay.textContent = points + " Points";
oldScoreHome.textContent = "Name: " + oName + " Score: " + oScore + " Time: " + oTime;


function startQuiz() { //things that happen when start button is clicked
  startBtn.style.display = "none"; // hide the now useless button
  setTimer(); // start the count down
  qidx = 0; //reset the game
  points = 0;
  displayText(0);
  // the magic where all the clicks in the game take place
  display.addEventListener("click", function (e) {
    e.preventDefault
    if (e.target.matches("button")) { //when you click a button
      if (e.target.getAttribute("data-correct") == "true") { // if you get it right, run add points func
        addPoints();
      } else if (e.target.getAttribute("data-correct") == "false") { // if you get it wrong, -10 seconds
        timeLeft -= 10;
        getNext();
      } else if (e.target.getAttribute("id") == "submit") { //to save your score to localStorage
        localStorage.setItem("time", uTime);
        localStorage.setItem("score", uScore);
        var uName = document.getElementById("name").value;
        localStorage.setItem("name", uName);
      }
    }
  });
}
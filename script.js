//global variables go here

//functions declared here

//main code body here

// click the start button > add event listener, hide button, start program.
var startBtn = document.querySelector("#start");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startBtn.style.display = "none";
  setTimer();
  console.log("started.");
}
// library of code question objects
var quizLib = [{
    question: "What is the answer?",
    op1: "A",
    op2: "B",
    op3: "C",
    op4: "D"
  },
  {
    question: "What is the new answer?",
    op1: "1",
    op2: "2",
    op3: "3",
    op4: "4"
  }
];
console.log(quizLib[0])
// countdown timer
var timeLeft = 120;
var timeElement = document.getElementById("time")
function setTimer(){
  var timer = setInterval(function() {
    timeLeft--;
    timeElement.textContent= "Seconds Left: " + timeLeft;

    if(timeLeft === 0) {
      clearInterval(timer);
      alert("time is up");
      // end screen function here
    }
  } ,1000);
}

// function to display question

// WHEN I answer a question THEN I am presented with another question >loop and function
// WHEN I answer a question incorrectly THEN time is subtracted from the clock > function if (correct) add points if (incorrect) minus time
// WHEN all questions are answered or the timer reaches 0 THEN the game is over AND I can save my initials and score combine into function
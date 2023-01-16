
let questionTitle = document.querySelector("#question-title");
let answerChoices = document.querySelector("#choices-list");
let timeRemaining = document.querySelector("#time");
let playerScore = 0;
let playerCorrectAnswer = 0;
let gameTime = 10;
let questionsAskedMarker = 0;
let clickedAnswer;
let rightAnswer;




function gameTimer() {

  let timerInterval =setInterval(function () {
  // timeRemaining.textContent = gameTime;
  // gameTime--;
  timeRemaining.textContent = gameTime;
  gameTime--;
  if(gameTime <0) {
    clearInterval(timerInterval);

    gameTime=0;

    gameEnd();
  } else {

    timeRemaining.textContent = gameTime;
    gameTime--;
    
  }
  
},1000)
  
}













function gamePlay() {

  let question = questions[questionsAskedMarker][0];
  questionTitle.innerHTML = question;
  for (let j = 1; j < 5; j++) {
    let answer = questions[questionsAskedMarker][j];
    rightAnswer = questions[questionsAskedMarker][5];

    let li = document.createElement("li");
    li.textContent = answer;
    li.setAttribute("data-index", j);
    answerChoices.appendChild(li);
    console.log(
      "The right answer is: " + questions[questionsAskedMarker][rightAnswer]
    );
  }
}

answerCheck();


function gameEnd() {

console.log("Your correct answers = "+playerCorrectAnswer);
  
}



function correctAnswer() {
  console.log("That is correct!!");
  let correctsound = new Audio("./assets/sfx/correct.wav");
  correctsound.play();
  playerCorrectAnswer++;
}


function wrongAnswer(params) {
  gameTime=gameTime-3;

  console.log("That is wrong!");
  let wrongSound = new Audio("./assets/sfx/incorrect.wav");
  wrongSound.play();
}










function answerCheck() {
  answerChoices.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
      let clearQuestion = document.querySelector("#question-title");
      let clearAnswer = document.querySelector("ul");
      clearQuestion.textContent = "";
      clearAnswer.textContent = "";
      questionsAskedMarker++;
      event.preventDefault();

      let clickedAnswer = event.target.getAttribute("data-index");

      if (clickedAnswer == rightAnswer) {
        correctAnswer();
      } else {

        wrongAnswer();
      }
      gamePlay();
    }
  });
}

let playBtn = document.querySelector("#start");

playBtn.addEventListener("click", function (event) {
  event.preventDefault();
  gameTimer();
  gamePlay();
  console.table(questions);
  document.getElementById("start-screen").innerHTML = "";
  document.getElementById("questions").setAttribute("class", "show");
});

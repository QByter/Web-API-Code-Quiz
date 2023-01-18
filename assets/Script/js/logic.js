let userInitialInput = document.querySelector("#initials");
let score = document.querySelector("#final-score");
let questionTitle = document.querySelector("#question-title");
let answerChoices = document.querySelector("#choices-list");
let timeRemaining = document.querySelector("#time");
let signUpButton = document.querySelector("#submit");
let highScores = document.querySelector("#highscores");

let playerScore = 0;
let playerCorrectAnswer = 0;
let gameTimeLeft = 10;
let questionsAskedMarker = 0;
let clickedAnswer;
let rightAnswer;
let highScore;

function gameTimer() {
  timeRemaining.textContent = gameTimeLeft;
  let timerInterval = setInterval(function () {
    gameTimeLeft--;
    timeRemaining.textContent = gameTimeLeft;
    if (gameTimeLeft <= 0) {
      clearInterval(timerInterval);
      gameTimeLeft = 0;
      timeRemaining.textContent = gameTimeLeft;
      gameEnd();
    }
  }, 1000);
}

function gamePlay() {
  highScore = JSON.parse(localStorage.getItem("highScoreBothAdded"));
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
  console.log("Your correct answers = " + playerCorrectAnswer);
  document.getElementById("questions").setAttribute("class", "hide");
  document.getElementById("end-screen").setAttribute("class", "show");
  playerScore = playerScore * 13;
  score.textContent = playerScore;
}

function correctAnswer() {
  console.log("That is correct!!");
  let correctsound = new Audio("./assets/sfx/correct.wav");
  correctsound.play();
  playerScore++;
}

function wrongAnswer(params) {
  gameTimeLeft-- - 3;
  console.log("That is wrong!");
  let wrongSound = new Audio("./assets/sfx/incorrect.wav");
  wrongSound.play();
}

signUpButton.addEventListener("click", function (event) {
 
  highScore.push([userInitialInput.value, playerScore]);
  userInitialInput.value = "";
  localStorage.setItem("highScoreBothAdded", JSON.stringify(highScore));

  location.reload();
  
});

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

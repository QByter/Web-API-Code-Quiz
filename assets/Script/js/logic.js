
let questionTitle = document.querySelector("#question-title");
let answerChoices = document.querySelector("#choices-list");
let timeRemaining = document.querySelector("#time");
let questionsAskedMarker = 0;

let clickedAnswer;
let rightAnswer;


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

function correctAnswer() {
  console.log("That is correct!!");
  let correctsound = new Audio("/assets/sfx/correct.wav");
  correctsound.play();
}
function wrongAnswer(params) {
  console.log("That is wrong!");
  let wrongSound = new Audio("/assets/sfx/incorrect.wav");
  wrongSound.play();
}

function timer(params) {}

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
  gamePlay();
  console.table(questions);
  document.getElementById("start-screen").innerHTML = "";
  document.getElementById("questions").setAttribute("class", "show");
});

let clearHighScores = document.querySelector("#clear");
let highScores = document.querySelector("#highscores");

let highScore = JSON.parse(localStorage.getItem("highScoreBothAdded"));

for (i = 0; i < highScore.length; i++) {
  let highScoreArray = highScore[i];
  let li = document.createElement("li");
  li.textContent = highScoreArray;
  highScores.appendChild(li);
}

clearHighScores.addEventListener("click", function (event) {
  highScores.innerHTML = "";
});

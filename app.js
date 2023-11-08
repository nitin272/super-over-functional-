const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const $team1Score = document.getElementById("score-team1");
const $team1Wickets = document.getElementById("wickets-team1");
const $team2Score = document.getElementById("score-team2");
const $team2Wickets = document.getElementById("wickets-team2");
const $team1SuperOver = document.getElementById("team1-superover");
const $team2SuperOver = document.getElementById("team2-superover");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

let team1Score = 0;
let team1Wickets = 0;
let team2Score = 0;
let team2Wickets = 0;
let team1BallsFaced = 0;
let team2BallsFaced = 0;
let turn = 1;

const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

function gameOver() {
  gameOverAudio.play();
  let message = "";
  if (team1Score > team2Score) {
    message = "IND wins";
  } else if (team2Score > team1Score) {
    message = "PAK wins";
  } else {
    message = "It's another superover!";
  }
  alert(message);
}

function updateScore() {
  $team1Score.textContent = team1Score;
  $team1Wickets.textContent = team1Wickets;
  $team2Score.textContent = team2Score;
  $team2Wickets.textContent = team2Wickets;
}

function updateSuperOver(team, outcome) {
  const $superOver = team === 1 ? $team1SuperOver : $team2SuperOver;
  const ballElement = document.createElement("div");
  ballElement.textContent = outcome;
  $superOver.appendChild(ballElement);
}

function handleStrike() {
  strikeAudio.pause();
  strikeAudio.currentTime = 0;
  strikeAudio.play();

  const randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn === 1) {
    team1BallsFaced++;
    updateSuperOver(1, randomElement);

    if (randomElement === "W") {
      team1Wickets++;
    } else {
      team1Score += randomElement;
    }

    if (team1BallsFaced === 6 || team1Wickets === 2) {
      turn = 2;
    }
  } else if (turn === 2) {
    team2BallsFaced++;
    updateSuperOver(2, randomElement);

    if (randomElement === "W") {
      team2Wickets++;
    } else {
      team2Score += randomElement;
    }

    if (team2BallsFaced === 6 || team2Wickets === 2 || team2Score > team1Score) {
      turn = 3;
      gameOver();
    }
    updateScore();
  }
}

strikeButton.onclick = handleStrike;

resetButton.onclick = () => {
  window.location.reload();
};

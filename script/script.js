const gameBoard = document.querySelector("#mt__game-box");
const gameOverWindow = document.querySelector("#gameOverWindow");
const gameOverText = document.querySelector("#gameOverText");
const gameOverRetryBtn = document.querySelector("#gameOverRetryBtn");
const keepPlayingBtn = document.querySelector("#keepPlayingBtn");
const choseLevel = document.querySelector("#choseLevel");
const choseLevelBtn = document.querySelector("#choseLevelBtn");
const playerScorePercentageDisplay = document.querySelector(
  "#playerScorePercentageDisplay"
);
const playerHardRecordPercentageDisplay = document.querySelector(
  "#playerHardRecordPercentageDisplay"
);
const playerNormalRecordPercentageDisplay = document.querySelector(
  "#playerNormalRecordPercentageDisplay"
);
const playerEasyRecordPercentageDisplay = document.querySelector(
  "#playerEasyRecordPercentageDisplay"
);
const levelDisplay = document.querySelector("#levelDisplay");

let bombs = [];
let level = choseLevel.value;
let playerCounter = 0;
let playerRecordHard = 0;
let playerRecordHardPercentage = 0;
let playerRecordNormal = 0;
let playerRecordNormalPercentage = 0;
let playerRecordEasy = 0;
let playerRecordEasyPercentage = 0;
let winningRatio = 0;
let winningPercentage = 0;

function updateScoreDisplayer() {
  playerScorePercentageDisplay.innerHTML = `${Math.floor(
    winningPercentage
  )}%<span>(${playerCounter} cards)</span>`;
  playerHardRecordPercentageDisplay.innerHTML = `${playerRecordHardPercentage}%<span>(${playerRecordHard} cards)</span>`;
  playerNormalRecordPercentageDisplay.innerHTML = `${playerRecordNormalPercentage}%<span>(${playerRecordNormal} cards)</span>`;
  playerEasyRecordPercentageDisplay.innerHTML = `${playerRecordEasyPercentage}%<span>(${playerRecordEasy} cards)</span>`;
}

function winChecker() {
  if (winningPercentage > 50) {
    gameOverText.className = "gameOverText--win";
    gameOverText.innerHTML = "Hai Vinto";
    gameOverRetryBtn.classList.add("d-none");
    keepPlayingBtn.classList.remove("d-none");
    gameOverWindow.classList.remove("d-none");
  }
}

function scoreChecker() {
  switch (level) {
    case 1:
      if (playerCounter > playerRecordEasy) {
        playerScorePercentageDisplay.classList.add("sidebar__percentage-over");
      }
      break;
    case 2:
      if (playerCounter > playerRecordNormal) {
        playerScorePercentageDisplay.classList.add("sidebar__percentage-over");
      }
      break;
    case 3:
      if (playerCounter > playerRecordHard) {
        playerScorePercentageDisplay.classList.add("sidebar__percentage-over");
      }
      break;
  }
}

function scoresRecord(level) {
  switch (level) {
    case 1:
      if (playerCounter > playerRecordEasy) {
        playerRecordEasy = playerCounter;
        playerRecordEasyPercentage = Math.floor(winningPercentage);
      }
      break;
    case 2:
      if (playerCounter > playerRecordNormal) {
        playerRecordNormal = playerCounter;
        playerRecordNormalPercentage = Math.floor(winningPercentage);
      }
      break;
    case 3:
      if (playerCounter > playerRecordHard) {
        playerRecordHard = playerCounter;
        playerRecordHardPercentage = Math.floor(winningPercentage);
      }
      break;
  }
  updateScoreDisplayer();
}

function gameCampoMinato(target) {
  let id = parseInt(target.target.id);
  if (bombs.includes(id)) {
    target.target.classList.add("mt__bomb");
    scoresRecord(level);
    gameOverText.innerHTML = "Hai Perso";
    gameOverText.classList.remove("gameOverText--win");
    gameOverWindow.classList.remove("d-none");
    playerScorePercentageDisplay.classList.remove("sidebar__percentage-over");
  } else {
    playerCounter++;
    scoreChecker();
    winningPercentage = playerCounter * winningRatio;
    console.log(winningPercentage);
    target.target.classList.add("mt__safe");
    updateScoreDisplayer();
    winChecker();
  }
}

function levelChoice() {
  level = parseInt(choseLevel.value);
  switch (level) {
    case 1:
      levelDisplay.innerHTML = "Easy";
      startGame(100);
      break;
    case 2:
      levelDisplay.innerHTML = "Normal";
      startGame(81);
      break;
    case 3:
      levelDisplay.innerHTML = "Hard";
      startGame(49);
      break;

    default:
      startGame(100);

      break;
  }
}

function startGame(cardNumber) {
  playerCounter = 0;
  winningPercentage = 0;

  gameBoard.innerHTML = "";
  bombs = [];
  for (let index = 0; index < 10; index++) {
    bomb = Math.floor(Math.random() * cardNumber + 1);
    bombs.push(bomb);
  }
  winningRatio = cardNumber / (cardNumber - 10);

  console.log("for cheaters", bombs);

  for (let index = 1; index <= cardNumber; index++) {
    let gameCard = document.createElement("div");
    gameCard.classList.add("mt__game-card");
    gameCard.classList.add(`mt__game-card--${cardNumber}`);
    gameCard.innerHTML = `<p class="mt__game-card__text d-inline-block">${index}</p>`;
    gameCard.id = index;
    gameBoard.appendChild(gameCard);

    gameCard.addEventListener("click", (target) => {
      if (target.target.id) {
        gameCampoMinato(target);
      }
    });
  }
}

levelChoice();

gameOverRetryBtn.addEventListener("click", () => {
  levelChoice();
  gameOverWindow.classList.add("d-none");
});
keepPlayingBtn.addEventListener("click", () => {
  gameOverWindow.classList.add("d-none");
});

choseLevelBtn.addEventListener("click", levelChoice);

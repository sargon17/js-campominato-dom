const gameBoard = document.querySelector("#mt__game-box");
const gameOverWindow = document.querySelector("#gameOverWindow");
const gameOverRetryBtn = document.querySelector("#gameOverRetryBtn");
const choseLevel = document.querySelector("#choseLevel");
const choseLevelBtn = document.querySelector("#choseLevelBtn");

let bombs = [];
let isGameOver = false;
startGame(100);

function gameCampoMinato(target) {
  let id = parseInt(target.target.id);
  if (bombs.includes(id)) {
    target.target.classList.add("mt__bomb");
    isGameOver = true;
    gameOverWindow.classList.remove("d-none");
  } else {
    target.target.classList.add("mt__safe");
  }
}

function levelChoice() {
  let level = parseInt(choseLevel.value);
  switch (level) {
    case 1:
      startGame(100);
      break;
    case 2:
      startGame(81);
      break;
    case 3:
      startGame(49);
      break;

    default:
      startGame(100);

      break;
  }
}

function startGame(cardNumber) {
  gameBoard.innerHTML = "";
  bombs = [];
  for (let index = 0; index < 10; index++) {
    bomb = Math.floor(Math.random() * cardNumber + 1);
    bombs.push(bomb);
  }

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

gameOverRetryBtn.addEventListener("click", () => {
  levelChoice();
  gameOverWindow.classList.add("d-none");
});

choseLevelBtn.addEventListener("click", levelChoice);

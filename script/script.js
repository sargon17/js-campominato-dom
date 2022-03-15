const gameBoard = document.querySelector("#mt__game-box");

let bombs = [];

startGame();

function gameCampoMinato(target) {
  let id = parseInt(target.target.id);
  if (bombs.includes(id)) {
    target.target.classList.add("mt__bomb");
  } else {
    target.target.classList.add("mt__safe");
  }
}

function startGame() {
  for (let index = 0; index < 10; index++) {
    bomb = Math.floor(Math.random() * 100 + 1);
    bombs.push(bomb);
  }

  console.log("for cheaters", bombs);

  for (let index = 1; index <= 100; index++) {
    let gameCard = document.createElement("div");
    gameCard.classList.add("mt__game-card");
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

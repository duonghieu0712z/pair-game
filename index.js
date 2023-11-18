const root = document.getElementById("root");
root.style.margin = "10px";
root.style.display = "grid";
root.style.justifyContent = "center";
root.style.alignItems = "center";

const txtCoin = document.createElement("div");
txtCoin.innerHTML = "Coin: 0";
txtCoin.style.fontSize = "20px";
txtCoin.style.textAlign = "center";
root.appendChild(txtCoin);

const btnRestart = document.createElement("button");
btnRestart.type = "button";
btnRestart.textContent = "Restart";
btnRestart.onclick = initGame;
btnRestart.style.fontSize = "20px";
btnRestart.style.margin = "10px";
btnRestart.style.padding = "10px";
btnRestart.style.border = "1px solid gray";
btnRestart.style.borderRadius = "4px";
btnRestart.style.cursor = "pointer";
root.appendChild(btnRestart);

const container = document.createElement("div");
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(5, auto)";
container.style.gap = "4px";
container.style.boxSizing = "border-box";
container.style.justifyContent = "center";
container.style.alignItems = "center";
root.appendChild(container);

let firstCard;
let lock = false;
let coin = 10000;
let countedMatch = 0;
const backgroundCardColor = "silver";

function createCard(color) {
  const card = document.createElement("div");
  card.style.width = "100px";
  card.style.height = "100px";
  card.style.backgroundColor = backgroundCardColor;
  card.style.border = "1px solid gray";
  card.style.borderRadius = "5px";
  card.style.cursor = "pointer";

  card.classList.add("card");
  card.dataset.color = color;
  card.dataset.revealed = false;

  card.onclick = function () {
    if (lock || this.dataset.revealed == true || this === firstCard) {
      return;
    }

    this.style.backgroundColor = this.dataset.color;

    if (!firstCard) {
      firstCard = this;
      return;
    }

    checkMatch(this);
  };

  return card;
}

function checkMatch(card) {
  if (card.dataset.color === firstCard.dataset.color) {
    matchCard(card);
  } else {
    unflip(card);
  }
}

function matchCard(card) {
  card.dataset.revealed = true;
  firstCard.dataset.revealed = true;

  firstCard = null;
  lock = false;
  updateCoin(1000);

  countedMatch += 2;
  if (countedMatch === 20) {
    setTimeout(() => alert(`You win, you get ${coin} coins! Click 'Restart' to start again!`), 11);
  }
}

function unflip(card) {
  lock = true;
  updateCoin(-500);

  setTimeout(() => {
    card.style.backgroundColor = backgroundCardColor;
    firstCard.style.backgroundColor = backgroundCardColor;

    firstCard = null;
    lock = false;
  }, 1000);
}

function updateCoin(bonus) {
  coin += bonus;
  txtCoin.innerHTML = `Coin: ${coin}`;

  if (coin < 0) {
    setTimeout(() => alert("You lose!"), 11);
    initGame();
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.trunc(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const colors = ["red", "green", "blue", "yellow", "magenta", "cyan", "orange", "brown", "pink", "purple"];

function initGame() {
  firstCard = null;
  lock = false;
  coin = 10000;
  updateCoin(0);
  container.replaceChildren();
  shuffle([...colors, ...colors]).forEach((value) => {
    const card = createCard(value);
    container.appendChild(card);
  });
}

initGame();

import { Node } from "./engine/node.js";
import { Card } from "./game/card.js";
import { shuffle } from "./game/utils.js";

const WIDTH = 100;
const HEIGHT = 146;
const ROW = 4;
const COLUMN = 5;
const DURATION = 0.5;
const DELAY = 1.2;

const START_X = (window.innerWidth - WIDTH * COLUMN) / 2;
const START_Y = (window.innerHeight - HEIGHT * ROW) / 2;

const CENTER_X = window.innerWidth / 2;
const CENTER_Y = window.innerHeight / 2;

let firstCard, secondCard;
let isLocked = false;

const container = new Node();
document.body.appendChild(container.element);

const cardNames = [
  "raye",
  "roze",
  "kagari",
  "shizuku",
  "hayate",
  "kaina",
  "azalea",
  "camellia",
  "zeke",
  "hamp",
];

shuffle([...cardNames, ...cardNames]).forEach((value, index) => {
  const card = new Card(value, `./assets/${value}.jpg`, "./assets/cover.jpg");

  card.x = CENTER_X - WIDTH / 2;
  card.y = CENTER_Y - HEIGHT / 2;

  const x = (index % COLUMN) * WIDTH + START_X;
  const y = Math.trunc(index / COLUMN) * HEIGHT + START_Y;
  card.translate(x, y, DURATION, index * 0.1);

  // card.x = (index % COLUMN) * WIDTH + START_X;
  // card.y = Math.trunc(index / COLUMN) * HEIGHT + START_Y;

  card.width = WIDTH;
  card.height = HEIGHT;

  card.onClick(() => {
    if (isLocked || card.isFlipped) {
      return;
    }

    card.flip(DURATION);

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    checkMatch();
  });

  container.addChild(card);
});

function checkMatch() {
  if (firstCard.value === secondCard.value) {
    firstCard = null;
    secondCard = null;

    isLocked = false;
    // todo
    return;
  }

  unflip();
}

function unflip() {
  isLocked = true;

  Promise.all([
    firstCard.flip(DURATION, DELAY),
    secondCard.flip(DURATION, DELAY),
  ]).then(() => (isLocked = false));

  console.log(firstCard.value);

  firstCard = null;
  secondCard = null;
}

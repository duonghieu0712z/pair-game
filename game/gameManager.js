import { Card } from "./card.js";
import { shuffle } from "./utils.js";

import { Label } from "../engine/label.js";
import { Sprite } from "../engine/sprite.js";

const CARD_WIDTH = 150;
const CARD_HEIGHT = 215;
const CARD_SPAN = 5;

const ROW = 4;
const COLUMN = 5;

const DURATION = 0.5;
const DELAY = 1.2;

const CENTER_X = window.innerWidth / 2;
const CENTER_Y = window.innerHeight / 2;

const BOARD_WIDTH = CARD_WIDTH * COLUMN + CARD_SPAN * (COLUMN - 1);
const BOARD_HEIGHT = CARD_HEIGHT * ROW + CARD_SPAN * (ROW - 1);

const START_X = (window.innerWidth - BOARD_WIDTH) / 2;
const START_Y = (window.innerHeight - BOARD_HEIGHT) / 2;

const CARD_NAMES = [
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

let firstCard, secondCard;
let isLocked = false;

const container = new Sprite("../assets/background.jpg");
document.body.appendChild(container.element);

// const scoreTxt = new Label("score");
// scoreTxt.font = "Arial";
// scoreTxt.size = 40;
// scoreTxt.color = "red";
// document.body.appendChild(scoreTxt.element);

export function initCards() {
  shuffle([...CARD_NAMES, ...CARD_NAMES]).forEach((value, index) => {
    const card = new Card(
      value,
      `../assets/${value}.jpg`,
      "../assets/cover.jpg"
    );

    const startX = CENTER_X - CARD_WIDTH / 2;
    const startY = CENTER_Y - CARD_HEIGHT / 2;

    const x = (index % COLUMN) * (CARD_WIDTH + CARD_SPAN) + START_X;
    const y = Math.trunc(index / COLUMN) * (CARD_HEIGHT + CARD_SPAN) + START_Y;
    gsap.fromTo(
      card,
      {
        x: startX,
        y: startY,
      },
      {
        x,
        y,
        duration: DURATION,
        delay: index * 0.1,
      }
    );

    card.width = CARD_WIDTH;
    card.height = CARD_HEIGHT;

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
}

function checkMatch() {
  if (firstCard.value === secondCard.value) {
    // container.removeChild(firstCard);
    // container.removeChild(secondCard);

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

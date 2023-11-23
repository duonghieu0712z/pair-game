import { Card } from "./Card.js";
import { shuffle } from "./utils.js";

import { Sprite } from "../engine/Sprite.js";

export class GameManager {
  constructor() {
    this.container = new Sprite("./assets/background.jpg");
    document.body.appendChild(this.container.element);

    this.cardWidth = 150;
    this.cardHeight = 215;
    this.cardSpan = 5;

    this.row = 4;
    this.column = 5;

    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;

    const boardWidth =
      this.cardWidth * this.column + this.cardSpan * (this.column - 1);
    const boardHeight =
      this.cardHeight * this.row + this.cardSpan * (this.row - 1);

    this.cardStartX = (window.innerWidth - boardWidth) / 2;
    this.cardStartY = (window.innerHeight - boardHeight) / 2;

    this.cardNames = [
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

    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
  }

  init() {
    shuffle([...this.cardNames, ...this.cardNames]).forEach((value, index) =>
      this.createCard(value, index)
    );
  }

  createCard(value, index) {
    const image = `./assets/${value}.jpg`;
    const cover = "./assets/cover.jpg";
    const card = new Card(value, image, cover);

    const row = Math.trunc(index / this.column);
    const column = index % this.column;

    const x = column * (this.cardWidth + this.cardSpan) + this.cardStartX;
    const y = row * (this.cardHeight + this.cardSpan) + this.cardStartY;

    card.x = x;
    card.y = y;

    card.width = this.cardWidth;
    card.height = this.cardHeight;

    card.onClick(() => {
      if (this.isLocked || card.isFlipped || card.isFlipping) {
        return;
      }

      card.flip(0.5);

      if (!this.firstCard) {
        this.firstCard = card;
        return;
      }

      this.secondCard = card;
      this.checkMatch();
    });

    this.container.addChild(card);
  }

  checkMatch() {
    if (this.firstCard.value === this.secondCard.value) {
      this.firstCard = null;
      this.secondCard = null;

      this.isLocked = false;

      return;
    }

    this.isLocked = true;

    Promise.all([
      this.firstCard.flip(0.5, 1.2),
      this.secondCard.flip(0.5, 1.2),
    ]).then(() => (this.isLocked = false));

    this.firstCard = null;
    this.secondCard = null;
  }
}

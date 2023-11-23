import { Card } from "./Card.js";
import { shuffle } from "./utils.js";

import { Label } from "../engine/Label.js";
import { Sprite } from "../engine/Sprite.js";

export class GameManager {
  constructor() {
    this.container = new Sprite("./assets/background.jpg");
    document.body.appendChild(this.container.element);

    this.createScoreText();
    this.createReplayButton();

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

    this.durationFlip = 0.5;
    this.delayFlipOver = 1.2;

    this.durationZoom = 1;
    this.delayZoom = 1.2;
  }

  createScoreText() {
    this.scoreText = new Label("Score: 0");
    this.scoreText.x = 50;
    this.scoreText.y = 50;
    this.scoreText.font = "Arial";
    this.scoreText.size = 36;
    this.scoreText.color = "white";
    document.body.appendChild(this.scoreText.element);
  }

  createReplayButton() {
    this.replayButton = new Label("Replay");
    this.replayButton.x = 50;
    this.replayButton.y = 100;
    this.replayButton.font = "Arial";
    this.replayButton.size = 36;
    this.replayButton.color = "white";
    this.replayButton.enableCursor(true);
    this.replayButton.onClick(() => this.init());
    document.body.appendChild(this.replayButton.element);
  }

  start() {
    this.init();
  }

  init() {
    this.score = 10000;
    this.updateScore(0);

    this.shuffleCards();

    this.flippedCardCount = 0;

    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
  }

  shuffleCards() {
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

    this.refreshContainer();

    shuffle([...cardNames, ...cardNames]).forEach((value, index) =>
      this.createCard(value, index)
    );
  }

  refreshContainer() {
    this.container.element.replaceChildren(
      this.container.element.firstElementChild
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

      card.flip(this.durationFlip);

      if (!this.firstCard) {
        this.firstCard = card;
        return;
      }

      this.secondCard = card;
      this.checkMatch();
    });

    this.container.addChild(card);
  }

  isMatch() {
    return this.firstCard.value === this.secondCard.value;
  }

  checkMatch() {
    this.isLocked = true;
    if (this.isMatch()) {
      this.updateScore(1000);

      Promise.all([
        this.firstCard.zoom(this.durationZoom, this.delayZoom),
        this.secondCard.zoom(this.durationZoom, this.delayZoom),
      ]).then(() => {
        this.container.removeChild(this.firstCard);
        this.container.removeChild(this.secondCard);

        this.firstCard = null;
        this.secondCard = null;

        this.isLocked = false;
      });

      this.flippedCardCount += 2;
      if (this.flippedCardCount === 20) {
        // todo
        console.log("chuc mung");
      }

      return;
    }

    this.updateScore(-500);
    this.flipOver();
  }

  flipOver() {
    Promise.all([
      this.firstCard.flip(this.durationFlip, this.delayFlipOver),
      this.secondCard.flip(this.durationFlip, this.delayFlipOver),
    ]).then(() => (this.isLocked = false));

    this.firstCard = null;
    this.secondCard = null;
  }

  updateScore(score) {
    this.score += score;
    this.scoreText.text = `Score: ${this.score}`;
  }
}

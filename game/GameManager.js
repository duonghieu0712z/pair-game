import { Label } from "../engine/Label.js";

export class GameManager {
  constructor(container) {
    this.container = container;
    this.container.onShuffleCard = (condition) => this.onShuffleCard(condition);
    this.container.onClickCard = (card) => this.onClickCard(card);

    this.durationFlip = 0.5;
    this.delayFlipOver = 1.2;

    this.durationZoom = 1;
    this.delayZoom = 1.2;

    this.createScoreText();
    this.createRestartButton();
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

  createRestartButton() {
    this.restartButton = new Label("Restart");
    this.restartButton.x = 50;
    this.restartButton.y = 100;
    this.restartButton.font = "Arial";
    this.restartButton.size = 36;
    this.restartButton.color = "white";
    this.restartButton.enableCursor(true);
    this.restartButton.onClick(() => this.init());
    document.body.appendChild(this.restartButton.element);
  }

  start() {
    this.init();
  }

  init() {
    this.score = 10000;
    this.updateScore(0);

    this.isLocked = true;
    this.container.shuffleCards();

    this.flippedCardCount = 0;

    this.firstCard = null;
    this.secondCard = null;
  }

  onShuffleCard(condition) {
    if (condition) {
      this.isLocked = false;
    }
  }

  onClickCard(card) {
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

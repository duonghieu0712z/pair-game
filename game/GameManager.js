export class GameManager {
  constructor(container, scoreText, restartButton, notificationText) {
    this.container = container;
    this.container.onShuffleCard = (condition) => this.onShuffleCard(condition);
    this.container.onClickCard = (card) => this.onClickCard(card);

    this.scoreText = scoreText;

    this.restartButton = restartButton;
    this.restartButton.onClick(() => this.init());

    this.notificationText = notificationText;

    this.durationFlip = 0.5;
    this.delayFlipOver = 1.2;

    this.durationZoom = 1;
    this.delayZoom = 1.2;
  }

  start() {
    this.init();
  }

  init() {
    this.notificationText.show(false);
    this.restartButton.show(false);

    this.score = 10000;
    this.scoreText.updateScore(this.score);

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
    this.checkMatched();
  }

  isMatched() {
    return this.firstCard.value === this.secondCard.value;
  }

  checkMatched() {
    this.isLocked = true;
    if (this.isMatched()) {
      this.handleMatched();
      return;
    }
    this.handleUnmatched();
  }

  handleMatched() {
    Promise.all([
      this.firstCard.zoom(this.durationZoom, this.delayZoom),
      this.secondCard.zoom(this.durationZoom, this.delayZoom),
    ]).then(() => {
      this.container.removeChild(this.firstCard);
      this.container.removeChild(this.secondCard);

      this.refreshCard();

      this.updateScore(1000);

      this.flippedCardCount += 2;
      if (this.flippedCardCount === 20) {
        this.notificationText.notify(true);
        this.restartButton.show(true);
      }
    });
  }

  handleUnmatched() {
    Promise.all([
      this.firstCard.flip(this.durationFlip, this.delayFlipOver),
      this.secondCard.flip(this.durationFlip, this.delayFlipOver),
    ]).then(() => {
      this.refreshCard();

      this.updateScore(-500);
      if (this.score <= 0) {
        this.notificationText.notify(false);
        this.restartButton.show(true);
        this.isLocked = true;
      }
    });
  }

  refreshCard() {
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
  }

  updateScore(score) {
    this.score += score;
    this.scoreText.updateScore(this.score);
  }
}

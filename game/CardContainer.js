import { Node } from "../engine/Node.js";

import { Card } from "./Card.js";
import { shuffle } from "./utils.js";

export class CardContainer extends Node {
  constructor() {
    super();

    this.onClickCard = () => {};
    this.onShuffleCard = () => {};

    this.cardWidth = 150;
    this.cardHeight = 215;
    this.cardSpan = 5;

    this.row = 4;
    this.column = 5;

    this.width = this.cardWidth * this.column + this.cardSpan * (this.column - 1);
    this.height = this.cardHeight * this.row + this.cardSpan * (this.row - 1);

    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.durationFlip = 0.5;
    this.delayFlipOver = 1.2;

    this.durationZoom = 1;
    this.delayZoom = 1.2;

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
  }

  shuffleCards() {
    this.reset();
    shuffle([...this.cardNames, ...this.cardNames]).forEach((value, index) =>
      this.createCard(value, index),
    );
  }

  reset() {
    this.removeChildren();
  }

  createCard(value, index) {
    const image = `./assets/${value}.jpg`;
    const cover = "./assets/cover.jpg";
    const card = new Card(value, image, cover);

    card.x = this.centerX - this.cardWidth / 2;
    card.y = this.centerY - this.cardHeight / 2;

    const row = Math.trunc(index / this.column);
    const column = index % this.column;

    const x = column * (this.cardWidth + this.cardSpan);
    const y = row * (this.cardHeight + this.cardSpan);

    card.width = this.cardWidth;
    card.height = this.cardHeight;

    card.onClick(() => this.onClickCard(card));

    this.addChild(card);

    card
      .moveTo(x, y, 1, 0.1 * index)
      .then(() => this.onShuffleCard(index === this.cardNames.length - 1));
  }
}

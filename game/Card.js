import { tween } from "./utils.js";

import { Node } from "../engine/Node.js";
import { Sprite } from "../engine/Sprite.js";

export class Card extends Node {
  constructor(value, image, cover) {
    super();

    this._image = new Sprite(image);
    this.addChild(this._image);

    this._cover = new Sprite(cover);
    this.addChild(this._cover);

    this.isFlipping = false;
    this.isFlipped = false;

    this.value = value;
  }

  get isFlipped() {
    return this._isFlipped;
  }

  set isFlipped(value) {
    this._isFlipped = value;
    this._image.active = this._isFlipped;
    this._cover.active = !this._isFlipped;
  }

  flip(duration, delay = 0) {
    this.isFlipping = true;
    return tween(this, {
      scaleX: 0,
      duration,
      delay,
      onComplete: () => {
        this.isFlipped = !this.isFlipped;
        tween(this, {
          scaleX: 1,
          duration,
          onComplete: () => (this.isFlipping = false),
        });
      },
    });
  }
}

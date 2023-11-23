import { tween } from "./utils.js";

import { Node } from "../engine/Node.js";
import { Sprite } from "../engine/Sprite.js";

export class Card extends Node {
  constructor(value, image, cover) {
    super();
    this.enableCursor(true);

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

  get opacity() {
    return this.element.style.opacity;
  }

  set opacity(value) {
    this.element.style.opacity = value;
  }

  zoom(duration, delay) {
    this.opacity = 1;
    return tween(this, {
      scaleX: 1.5,
      scaleY: 1.5,
      opacity: 0,
      duration,
      delay,
    });
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

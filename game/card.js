import { Node } from "../engine/node.js";
import { Sprite } from "../engine/sprite.js";

export class Card extends Node {
  constructor(value, image, cover) {
    super();

    this._image = new Sprite(image);
    this.addChild(this._image);

    this._cover = new Sprite(cover);
    this.addChild(this._cover);

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
    return gsap.to(this, {
      scaleX: 0,
      duration,
      delay,
      onComplete: () => {
        this.isFlipped = !this.isFlipped;
        gsap.to(this, { scaleX: 1, duration });
      },
    });
  }
}

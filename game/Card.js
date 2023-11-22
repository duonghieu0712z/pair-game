import { Node } from "../engine/Node.js";
import { Sprite } from "../engine/Sprite.js";

export class Card extends Node {
  constructor(value, image, cover) {
    super();

    this._image = new Sprite(image);
    this.addChild(this._image);

    this._cover = new Sprite(cover);
    this.addChild(this._cover);

    this.isFlipped = false;
    this.value = value;

    this.show(this.isFlipped);
  }

  show(value) {
    this._image.active = value;
    this._cover.active = !value;
  }

  flip(duration, delay = 0) {
    this.isFlipped = !this.isFlipped;
    return gsap.to(this, {
      scaleX: 0,
      duration,
      delay,
      onComplete: () => {
        this.show(this.isFlipped);
        gsap.to(this, { scaleX: 1, duration });
      },
    });
  }
}

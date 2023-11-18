import { Node } from "./Node";

export class Sprite extends Node {
  constructor(image) {
    super();

    this._img = document.createElement("img");
    this.addChild(this._img);

    this.image = image;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
    this._img.src = value;
  }
}

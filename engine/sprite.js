import { Node } from "./node.js";

export class Sprite extends Node {
  constructor(src) {
    super();

    this.image = this._createElement("img");
    this.element.appendChild(this.image);

    this.src = src;
  }

  get src() {
    return this._src;
  }

  set src(value) {
    this._src = value;
    this.image.src = this._src;
    this.image.alt = this._src;
  }
}

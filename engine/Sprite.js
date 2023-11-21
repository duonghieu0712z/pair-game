import { Node } from "./node.js";

export class Sprite extends Node {
  constructor(src) {
    super("img");

    this.src = src;
  }

  get src() {
    return this._src;
  }

  set src(value) {
    this._src = value;
    this.element.src = this._src;
    this.element.alt = this._src;
  }
}

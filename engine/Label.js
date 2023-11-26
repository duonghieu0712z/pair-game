import { Node } from "./Node.js";

export class Label extends Node {
  constructor(text) {
    super();
    this.element.style.width = "";
    this.element.style.height = "";
    this.element.style.textAlign = "center";

    this.text = text;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
    this.element.textContent = this._text;
  }

  get font() {
    return this._font;
  }

  set font(value) {
    this._font = value;
    this.element.style.fontFamily = this._font;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
    this.element.style.fontSize = this._size + "px";
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
    this.element.style.color = this._color;
  }

  get isBold() {
    return this._isBold;
  }

  set isBold(value) {
    this._isBold = value;
    this.element.style.fontWeight = this._isBold ? "bold" : "normal";
  }
}

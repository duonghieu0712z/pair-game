import { Node } from "./Node";

export class Label extends Node {
  constructor(text) {
    super();

    this.text = text;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
    this._element.textContent = this._text;
  }
}

export class Node {
  constructor() {
    this._element = this._createElement();
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
    this._element.style.left = this._x + "px";
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
    this._element.style.top = this._y + "px";
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
    this._element.style.width = this._width + "px";
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this._element.style.height = this._height + "px";
  }

  get scaleX() {
    return this._scaleX;
  }

  set scaleX(value) {
    this._scaleX = value;
    this._scale();
  }

  get scaleY() {
    return this._scaleY;
  }

  set scaleY(value) {
    this._scaleY = value;
    this._scale();
  }

  get active() {
    return this._active;
  }

  set active(value) {
    this._active = value;
    this._element.style.display = this._active ? "block" : "none";
  }

  _createElement() {
    const element = document.createElement("div");
    element.style.position = "absolute";
    return element;
  }

  _scale() {
    this._element.style.transform = `scale(${this._scaleX}, ${this._scaleY})`;
  }

  addChild(node) {
    this._element.appendChild(node);
  }

  removeChild(node) {
    this._element.removeChild(node);
  }

  show(active) {
    this.active = active;
  }
}

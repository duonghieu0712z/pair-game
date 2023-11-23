export class Node {
  constructor() {
    this.element = this._createElement();

    this.scaleX = 1;
    this.scaleY = 1;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
    this.element.style.left = this._x + "px";
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
    this.element.style.top = this._y + "px";
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
    this.element.style.width = this._width + "px";
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this.element.style.height = this._height + "px";
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
    this.element.style.display = this._active ? "block" : "none";
  }

  _createElement(tagName = "div") {
    const element = document.createElement(tagName);
    element.style.position = "absolute";
    element.style.width = "100%";
    element.style.height = "100%";

    return element;
  }

  _scale() {
    this.element.style.transform = `scale(${this._scaleX}, ${this._scaleY})`;
  }

  enableCursor(value) {
    this.element.style.cursor = value ? "pointer" : "";
  }

  addChild(node) {
    this.element.appendChild(node.element);
  }

  removeChild(node) {
    this.element.removeChild(node.element);
  }

  show(active) {
    this.active = active;
  }

  onClick(cb) {
    this.element.onclick = cb;
  }
}

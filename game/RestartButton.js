import { Label } from "../engine/Label.js";

export class RestartButton extends Label {
  constructor() {
    super("RESTART");
    this.x = 50;
    this.y = 100;
    this.font = "Arial";
    this.size = 36;
    this.color = "red";
    this.enableCursor(true);

    this.width = 300;
    this.height = 60;

    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2 + 60;

    this.active = false;
  }
}

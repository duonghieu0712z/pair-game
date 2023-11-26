import { Label } from "../engine/Label.js";

export class NotificationText extends Label {
  constructor() {
    super("");
    this.font = "Arial";
    this.size = 48;
    this.color = "red";
    this.isBold = true;

    this.width = 300;
    this.height = 60;

    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;

    this.active = false;
  }

  notify(isWin) {
    if (isWin) {
      this.text = "YOU WIN!";
    } else {
      this.text = "YOU LOSE!";
    }

    this.active = true;
  }
}

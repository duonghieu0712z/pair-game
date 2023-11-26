import { Label } from "../engine/Label.js";

export class ScoreText extends Label {
  constructor() {
    super("Score: 0");
    this.x = 50;
    this.y = 50;
    this.font = "Arial";
    this.size = 36;
    this.color = "white";
  }

  updateScore(score) {
    this.text = `Score: ${score}`;
  }
}

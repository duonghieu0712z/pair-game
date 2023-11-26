import { Background } from "./Background.js";
import { CardContainer } from "./CardContainer.js";
import { GameManager } from "./GameManager.js";
import { NotificationText } from "./NotificationText.js";
import { RestartButton } from "./RestartButton.js";
import { ScoreText } from "./ScoreText.js";

export class Scene {
  constructor() {
    this.background = new Background();
    this.add(this.background);

    this.container = new CardContainer();
    this.add(this.container);

    this.scoreText = new ScoreText();
    this.add(this.scoreText);

    this.restartButton = new RestartButton();
    this.add(this.restartButton);

    this.notificationText = new NotificationText();
    this.add(this.notificationText);

    this.gameManager = new GameManager(
      this.container,
      this.scoreText,
      this.restartButton,
      this.notificationText,
    );
    this.gameManager.start();
  }

  add(node) {
    document.body.appendChild(node.element);
  }
}

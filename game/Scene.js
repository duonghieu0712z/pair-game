import { Background } from "./Background.js";
import { CardContainer } from "./CardContainer.js";
import { GameManager } from "./GameManager.js";

export class Scene {
  constructor() {
    this.background = new Background();
    this.add(this.background);

    this.container = new CardContainer();
    this.add(this.container);

    this.gameManager = new GameManager(this.container);
    this.gameManager.start();
  }

  add(node) {
    document.body.appendChild(node.element);
  }
}

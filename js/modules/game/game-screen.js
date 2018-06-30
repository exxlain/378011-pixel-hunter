import BackButtonView from '../back-button/back-button-view';
import HeaderGameView from '../header/header-game-view';
import LevelView from './level-view.js';
import Application from '../../application.js';
import {resizeImages} from '../../game-functions/resize.js';
const TICK_INTERVAL = 1000;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.content = new LevelView(this.model.getCurrentLevel(), this.model.answers);
    this.gameHeader = new HeaderGameView(this.model.state);
    this.backButton = new BackButtonView();

    this.root = document.createElement(`div`);
    this.createHeaderElement();
    this.root.appendChild(this.header);
    this.root.appendChild(this.content.element);
    this._interval = null;
    this.updateHeader();
  }
  createHeaderElement() {
    this.header = document.createElement(`header`);
    this.header.className = `header`;

    this.header.appendChild(this.backButton.element);
    this.header.appendChild(this.gameHeader.element);

  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startGame() {
    this.model.resetTime();
    this.changeLevel();

    this._interval = setInterval(() => {
      if (!this.model.isTimeEnd()) {
        this.model.tick();
        this.updateHeader();
      } else {
        this.answer(false);
      }
    }, TICK_INTERVAL);
  }

  answer(answer) {
    this.stopGame();
    if (answer) {
      this.model.generateTrueAnswer();
    } else {
      this.model.die();
      this.model.generateFalseAnswer();
    }
    if (this.model.isDead() || this.model.isEnd()) {
      this.endGame();
    } else {
      this.model.goToNextLevel();
      this.startGame();
    }
  }

  restart() {
    Application.showModalConfirm();
  }

  updateHeader() {
    const gameHeader = new HeaderGameView(this.model.state);
    const backButton = new BackButtonView();
    this.header.replaceChild(gameHeader.element, this.gameHeader.element);
    this.header.replaceChild(backButton.element, this.backButton.element);
    this.gameHeader = gameHeader;
    this.backButton = backButton;
    this.backButton.onRestartClick = this.restart.bind(this);
  }

  changeLevel() {
    this.updateHeader();
    const level = new LevelView(this.model.getCurrentLevel(), this.model.answers);
    level.onAnswer = this.answer.bind(this);
    this.changeContentView(level);
  }

  endGame() {
    Application.showStats(this.model.state, this.model.answers, this.model.playerName);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
    resizeImages(view.element);
  }
}

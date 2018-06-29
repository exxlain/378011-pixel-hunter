import HeaderGameView from '../header-game/header-game-view';
import LevelView from './level-view.js';
import Application from '../../application.js';
import {resizeImages} from '../../game-functions/resize.js';
const TICK_INTERVAL = 1000;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderGameView(this.model.state);
    this.content = new LevelView(this.model.getCurrentLevel(), this.model.answers);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this._interval = null;
    this.updateHeader();
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

  back() {
    Application.showModalConfirm();
  }

  updateHeader() {
    const header = new HeaderGameView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    header.onBack = this.back.bind(this);
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

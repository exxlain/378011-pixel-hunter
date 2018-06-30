import StatsView from './stats-view.js';
import BackButtonView from '../back-button/back-button-view';
import HeaderView from '../header/header-view';
import Application from '../../application.js';

export default class StatsScreen {
  constructor(state, answers, playerName) {
    this.state = state;
    this.answers = answers;
    this.playerName = playerName;
    this.content = new StatsView(this.state, this.answers);
    this.backButton = new BackButtonView();
    this.header = new HeaderView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element.appendChild(this.backButton.element));
    this.root.appendChild(this.content.element);

    this.init();
  }

  get element() {
    return this.root;
  }

  init() {
    this.backButton.onRestartClick = this.restart.bind(this);
  }

  restart() {
    Application.showGreeting();
  }
}

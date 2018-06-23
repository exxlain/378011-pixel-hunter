import StatsView from './stats-view.js';
import Application from '../../application.js';

export default class StatsScreen {
  constructor(state, answers, playerName) {
    this.state = state;
    this.answers = answers;
    this.playerName = playerName;
    this.content = new StatsView(this.state, this.answers);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);

    this.init();
  }

  get element() {
    return this.root;
  }

  init() {
    this.content.onRestart = this.restart.bind(this);
  }

  restart() {
    Application.showGreeting();
  }

}

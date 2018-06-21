import StatsView from './stats-view.js';
import Application from '../../application.js';

export default class StatsScreen {
  constructor(state, answers) {
    this.state = state;
    this.answers = answers;
    this.content = new StatsView(this.state, this.answers);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.content.onRestart = this.restart.bind(this);
  }

  get element() {
    return this.root;
  }

  restart() {
    Application.showGame(`macrell`);
  }

}

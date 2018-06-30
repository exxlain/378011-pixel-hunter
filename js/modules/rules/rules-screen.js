import RulesView from './rules-view';
import BackButtonView from '../back-button/back-button-view';
import HeaderView from '../header/header-view';
import Application from '../../application.js';


export default class RulesScreen {
  constructor() {
    this.content = new RulesView();
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
    this.content.onNextClick = this.click.bind(this);
    this.backButton.onRestartClick = this.restart.bind(this);
  }

  click(name) {
    Application.showGame(name);
  }

  restart() {
    Application.showGreeting();
  }
}

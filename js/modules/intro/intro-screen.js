import IntroView from './intro-view';
import Application from '../../application.js';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.root = document.createElement(`div`);
    this.root.classList.add(`intro__place`);
    this.root.appendChild(this.content.element);

    this.init();
  }

  get element() {
    return this.root;
  }

  init() {
    this.content.onClick = this.click.bind(this);
  }

  click() {
    Application.showGreeting();
  }
}

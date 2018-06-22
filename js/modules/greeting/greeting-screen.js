import GreetingView from './greeting-view';
import Application from '../../application.js';

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.root = document.createElement(`div`);
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
    Application.showRules();
  }

}

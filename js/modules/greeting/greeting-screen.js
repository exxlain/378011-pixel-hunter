import GreetingView from './greeting-view';
import Application from '../../application.js';

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.content.onClick = this.click.bind(this);
  }

  get element() {
    return this.root;
  }

  click() {
    Application.showRules();
  }

}

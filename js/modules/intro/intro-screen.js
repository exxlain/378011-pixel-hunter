import IntroView from './intro-view';
import Application from '../../application.js';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.content.onClick = this.click.bind(this);
  }

  get element() {
    return this.root;
  }

  click() {
    Application.showGreeting();
  }

}

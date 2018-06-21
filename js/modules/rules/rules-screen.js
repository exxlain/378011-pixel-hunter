import RulesView from './rules-view';
import Application from '../../application.js';

export default class RulesScreen {
  constructor() {
    this.content = new RulesView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.content.onClick = this.click.bind(this);
    this.content.onBack = this.back.bind(this);
  }

  get element() {
    return this.root;
  }

  click() {
    Application.showGame(`macrell`);
  }

  back() {
    Application.showGreeting();
  }

}

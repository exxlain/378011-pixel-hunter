import IntroView from './intro-view';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.root = document.createElement(`div`);
    this.root.classList.add(`intro__place`);
    this.root.appendChild(this.content.element);
  }

  get element() {
    return this.root;
  }
}

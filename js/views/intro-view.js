import AbstractView from './abstract-view';
import footerTemplate from '../blocks/footer';
import {ENTER_KEY_CODE} from '../data/data';

export default class IntroView extends AbstractView {

  get template() {
    return `<div id="main" class="central__content">
      <div id="intro" class="intro">
      <h1 class="intro__asterisk" tabindex="1">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>${footerTemplate}`;
  }

  bind() {
    const introButton = this.element.querySelector(`.intro__asterisk`);
    introButton.addEventListener(`click`, () => {
      this.onClick();
    });


    introButton.addEventListener(`keydown`, ({keyCode}) => {
      if (keyCode === ENTER_KEY_CODE) {
        this.onClick();
      }
    });
  }

  onClick() {
  }
}

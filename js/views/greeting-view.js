import AbstractView from './abstract-view';
import footerTemplate from '../blocks/footer';
import {ENTER_KEY_CODE} from '../data/data';

export default class GreetingView extends AbstractView {

  get template() {
    return `<div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">
      <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
      <p>Правила игры просты.<br>
        Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
        Задача кажется тривиальной, но не думай, что все так просто.<br>
        Фотореализм обманчив и коварен.<br>
        Помни, главное — смотреть очень внимательно.</p>
    </div>
    <div class="greeting__continue" tabindex="1"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>${footerTemplate}`;
  }

  bind() {
    const greetingContinue = this.element.querySelector(`.greeting__continue`);
    greetingContinue.addEventListener(`click`, () => {
      this.onClick();
    });
    greetingContinue.addEventListener(`keydown`, ({keyCode}) => {
      if (keyCode === ENTER_KEY_CODE) {
        this.onClick();
      }
    });
  }

  onClick() {
  }
}

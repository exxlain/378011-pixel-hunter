import AbstractView from '../abstract-view';
import {ENTER_KEY_CODE} from '../../data/data';

export default class BackButtonView extends AbstractView {

  get template() {
    return `<div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>`;
  }

  bind(el) {
    const backButton = el.querySelector(`button.back`);

    const onRestartButtonClick = () => {
      this.onRestartClick();
      backButton.removeEventListener(`click`, onRestartButtonClick);
    };

    backButton.addEventListener(`click`, onRestartButtonClick);

    backButton.addEventListener(`keydown`, ({keyCode}) => {
      if (keyCode === ENTER_KEY_CODE) {
        onRestartButtonClick();
      }
    });
  }

  onRestartClick() {
  }
}

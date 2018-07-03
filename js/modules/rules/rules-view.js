import AbstractView from '../abstract-view';
import footerTemplate from '../../blocks/footer';

const resetForm = (button, input) => {
  button.disabled = true;
  input.value = ``;
};

export default class RulesView extends AbstractView {

  get template() {
    return `<div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>${footerTemplate}`;
  }

  bind() {
    const rulesForm = this.element.querySelector(`.rules__form`);
    const rulesButton = rulesForm.querySelector(`.rules__button`);
    const rulesInput = rulesForm.querySelector(`.rules__input`);

    const onRulesInputChange = () => {
      rulesButton.disabled = !rulesInput.value.trim().length;
    };

    rulesInput.addEventListener(`input`, onRulesInputChange);

    const onSubmitButtonClick = (evt) => {
      evt.preventDefault();
      const newName = rulesInput.value;
      this.onNextClick(newName);
      resetForm(rulesButton, rulesInput);

      rulesInput.removeEventListener(`input`, onRulesInputChange);
      rulesForm.removeEventListener(`submit`, onSubmitButtonClick);
    };

    rulesForm.addEventListener(`submit`, (evt) => {
      onSubmitButtonClick(evt);
    });
  }

  onNextClick(name) {
    return name;
  }
}

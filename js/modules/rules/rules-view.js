import AbstractView from '../abstract-view';
import headerStaticTemplate from '../../blocks/header-static';
import footerTemplate from '../../blocks/footer';

export default class RulesView extends AbstractView {

  get template() {
    return `${headerStaticTemplate}<div class="rules">
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

    rulesInput.addEventListener(`input`, () => {
      rulesButton.disabled = !rulesInput.value.trim().length;
    });
    const resetForm = () => {
      rulesButton.disabled = true;
      rulesInput.value = ``;
    };
    rulesForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const newName = rulesInput.value;
      this.onClick(newName);
      resetForm();
    });

    this.element.querySelector(`button.back`).addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onClick(name) {
    return name;
  }

  onBack() {
  }
}


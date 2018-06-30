import AbstractView from '../abstract-view';

export default class ModalConfirmView extends AbstractView {

  get template() {
    return `<section class="modal-confirm modal-confirm__wrap">
    <form class="modal-confirm__inner">
      <button class="modal-confirm__close" type="button">Закрыть</button>
      <h2 class="modal-confirm__title">Подтверждение</h2>
      <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal-confirm__btn-wrap">
        <button class="modal-confirm__btn">Ок</button>
        <button class="modal-confirm__btn">Отмена</button>
      </div>
    </form>
  </section>`;
  }

  bind() {
    const closeButton = this.element.querySelector(`.modal-confirm__close`);
    const cancelButton = this.element.querySelector(`.modal-confirm__btn:last-child`);
    const confirmButton = this.element.querySelector(`.modal-confirm__btn:first-child`);

    const onCancelClick = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      cancelButton.removeEventListener(`click`, onCancelClick);
      closeButton.removeEventListener(`click`, onCancelClick);

      this.onCancel();
    };

    cancelButton.addEventListener(`click`, onCancelClick);
    closeButton.addEventListener(`click`, onCancelClick);

    const onConfirmClick = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      confirmButton.removeEventListener(`click`, onConfirmClick);

      this.onConfirm();
    };

    confirmButton.addEventListener(`click`, (evt) => {
      onConfirmClick(evt);
    });
  }

  onCancel() {
  }

  onConfirm() {
  }
}

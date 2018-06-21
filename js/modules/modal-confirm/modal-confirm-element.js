import ModalConfirmView from './modal-confirm-view.js';
import Application from '../../application.js';

export default class ModalConfirmElement {
  constructor() {
    this.content = new ModalConfirmView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.content.onCancel = this.cancel.bind(this);
    this.content.onConfirm = this.confirm.bind(this);
  }

  get element() {
    return this.root;
  }

  cancel() {
    this.root.removeChild(this.content.element);
  }

  confirm() {
    this.root.removeChild(this.content.element);
    Application.showGreeting();
  }

}

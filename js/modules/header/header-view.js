import AbstractView from '../abstract-view';

export default class HeaderView extends AbstractView {

  get template() {
    return `<header class="header"></header>`;
  }

}

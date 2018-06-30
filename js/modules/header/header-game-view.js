import AbstractView from '../abstract-view';
import {Limit} from '../../data/data';


export default class HeaderGameView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;

    this.init();
  }

  get template() {
    return `<h1 class="game__timer">${this.state.time}</h1>
    <div class="game__lives">
    ${new Array(Limit.LIVES - this.state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    ${new Array(this.state.lives - 1)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    </div>`;
  }

  init() {
    const timer = this.element.querySelector(`.game__timer`);
    if (this.state.time <= Limit.TIMER_TWINK) {
      timer.classList.add(`game__timer-animate`);
    }
  }
}

import AbstractView from '../abstract-view';
import statsTableTemplate from '../../blocks/stats-table-template';

export default class ScoreboardView extends AbstractView {

  get template() {
    return `
<div class="end">
  <div class="scoreboard">Scoreboard is loading...</div>
</div>`;
  }

  bind() {
    this._scoreBoardContainer = this.element.querySelector(`div.scoreboard`);
  }

  showScores(scores) {
    this._scoreBoardContainer.innerHTML = ``;
    if (scores.length > 1) {
      scores.pop();
      scores.reverse();
      this._scoreBoardContainer.innerHTML = `
      ${scores.map((it, i) => statsTableTemplate(it, it.stats, i + 2)).join(``)}`;
    }
  }

}

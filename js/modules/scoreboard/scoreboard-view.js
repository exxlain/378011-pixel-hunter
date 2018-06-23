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
    if (scores.length === 2) {
      this._scoreBoardContainer.innerHTML = `${statsTableTemplate(scores[0], scores[0].stats, 2)}`;
    }
    if (scores.length > 2) {
      this._scoreBoardContainer.innerHTML = `${statsTableTemplate(scores[scores.length - 2], scores[scores.length - 2].stats, 2)}
      ${statsTableTemplate(scores[scores.length - 3], scores[scores.length - 3].stats, 3)}`;
    }
  }
}


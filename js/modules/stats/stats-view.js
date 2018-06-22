import AbstractView from '../abstract-view';
import headerStaticTemplate from '../../blocks/header-static';
import footerTemplate from '../../blocks/footer';
import statsTemplate from '../../blocks/stats';
import countPoints from '../../game-functions/count-points';
import {Limit, Rate} from '../../data/data';

// считает баллы за правильные ответы
const countPointsForCorrect = (arr) => {
  const resultArr = arr.filter((el) => el.correctAnswer);
  const sum = resultArr.length * Rate.CORRECT_ANSWER_POINTS;
  return sum;
};

// считает количество быстрых ответов
const countFastAnswers = (arr) => {
  const resultArr = arr.filter((el) => el.correctAnswer);
  const fastArr = resultArr.filter((el) => el.answerTime > Limit.TIME - Limit.FAST_TIME);
  const fasts = fastArr.length;
  return fasts;
};

// считает количество медленных ответов
const countSlowAnswers = (arr) => {
  const resultArr = arr.filter((el) => el.correctAnswer);
  const fastArr = resultArr.filter((el) => el.answerTime < Limit.TIME - Limit.SLOW_TIME);
  const fasts = fastArr.length;
  return fasts;
};

export default class StatsView extends AbstractView {
  constructor(state, answers) {
    super();
    this.state = state;
    this.answers = answers;
  }

  get template() {
    return `${headerStaticTemplate}<div class="result">
    <h1>${this.state.lives ? `Победа!` : `Проигрыш`}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">${statsTemplate(this.answers)}</td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${countPointsForCorrect(this.answers)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${countFastAnswers(this.answers)}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${countFastAnswers(this.answers) * Rate.FAST_ANSWER_BONUS}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.state.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.state.lives * Rate.FOR_LIVE_BONUS}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${countSlowAnswers(this.answers)}<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${countSlowAnswers(this.answers) * Rate.SLOW_ANSWER_FINE}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countPoints(this.answers, this.state.lives)}</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </div>${footerTemplate}`;
  }

  bind() {
    this.element.querySelector(`button.back`).addEventListener(`click`, () => {
      this.onRestart();
    });
  }

  onRestart() {
  }

}


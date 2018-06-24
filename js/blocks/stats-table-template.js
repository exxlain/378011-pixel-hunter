import statsTemplate from './stats';
import countPoints from '../game-functions/count-points';
import {Rate} from '../data/data';

const countPointsForCorrect = (arr) => {
  const resultArr = arr.filter((el) => el === `correct` || el === `slow` || el === `fast`);
  const sum = resultArr.length * Rate.CORRECT_ANSWER_POINTS;
  return sum;
};

const countFastAnswers = (arr) => {
  const resultArr = arr.filter((el) => el === `fast`);
  const fastAnswers = resultArr.length;
  return fastAnswers;
};

const countSlowAnswers = (arr) => {
  const resultArr = arr.filter((el) => el === `slow`);
  const slowAnswers = resultArr.length;
  return slowAnswers;
};


const statsTableTemplate = (state, answers, number) => {
  return `<table class="result__table">
      <tr>
        <td class="result__number">${number}.</td>
        <td colspan="2">${statsTemplate(answers)}</td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${countPointsForCorrect(answers)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${countFastAnswers(answers)}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${countFastAnswers(answers) * Rate.FAST_ANSWER_BONUS}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${state.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${state.lives * Rate.FOR_LIVE_BONUS}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${countSlowAnswers(answers)}<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${countSlowAnswers(answers) * Rate.SLOW_ANSWER_FINE}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countPoints(answers, state.lives)}</td>
      </tr>
    </table>`;
};

export default statsTableTemplate;

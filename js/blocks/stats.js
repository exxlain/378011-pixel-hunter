import {convertAnswersArr} from '../game-functions/game-logic';
import {Limit} from '../data/data';

const statsTemplate = (answersArr) => {
  const results = convertAnswersArr(answersArr);

  let stat = results.reduce((previous, current) => {
    return previous + (`<li class="stats__result stats__result--${current}"></li>`);
  }, ``);

  if (results.length < Limit.LEVELS) {
    for (let i = 0; i < Limit.LEVELS - results.length; i++) {
      stat += `<li class="stats__result stats__result--unknown"></li>`;
    }
  }
  return `<ul class="stats">${stat}</ul>`;
};

export default statsTemplate;

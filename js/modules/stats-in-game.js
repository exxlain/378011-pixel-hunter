import {convertAnswersArr} from '../game-functions/game-logic';


const renderStatsInGame = (answersArr) => {
  const results = convertAnswersArr(answersArr);

  let stat = results.reduce((previous, current) => {
    return previous + (`<li class="stats__result stats__result--${current}"></li>`);
  }, ``);

  if (results.length < 10) {
    for (let i = 0; i < 10 - results.length; i++) {
      stat += `<li class="stats__result stats__result--unknown"></li>`;
    }
  }
  return `<ul class="stats">${stat}</ul>`;
};

export default renderStatsInGame;

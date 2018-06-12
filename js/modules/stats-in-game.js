import {answerConvert} from '../game-functions/game-logic';


const renderStatsInGame = (answersArr) => {
  const results = answerConvert(answersArr);
  let stat = ``;
  results.forEach((item) => {
    stat += `<li class="stats__result stats__result--${item}"></li>`;
  });
  if (results.length < 10) {
    for (let i = 0; i < 10 - results.length; i++) {
      stat += `<li class="stats__result stats__result--unknown"></li>`;
    }
  }
  return `<ul class="stats">${stat}</ul>`;
};

export default renderStatsInGame;

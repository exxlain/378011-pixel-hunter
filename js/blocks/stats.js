import {Limit} from '../data/data';

const statsTemplate = (answersArr) => {

  let stat = answersArr.reduce((previous, current) => {
    return previous + (`<li class="stats__result stats__result--${current}"></li>`);
  }, ``);

  if (answersArr.length < Limit.LEVELS) {
    for (let i = 0; i < Limit.LEVELS - answersArr.length; i++) {
      stat += `<li class="stats__result stats__result--unknown"></li>`;
    }
  }
  return `<ul class="stats">${stat}</ul>`;
};

export default statsTemplate;

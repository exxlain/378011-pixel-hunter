import {Limit} from '../data/data';

// преобразует массив объектов ответов в массив вида [`fast`, `correct`]
export const convertAnswersArr = (arr) => {
  let results = arr.map((el) => {
    let answer;
    if (el.correctAnswer) {
      if (el.answerTime > Limit.TIME - Limit.FAST_TIME) {
        answer = `fast`;
      } else if (el.answerTime < Limit.TIME - Limit.SLOW_TIME) {
        answer = `slow`;
      } else {
        answer = `correct`;
      }
    } else {
      answer = `wrong`;
    }
    return answer;
  });
  return results;
};

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

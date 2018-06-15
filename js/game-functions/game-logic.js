import {Limit, Rate} from '../data/data';

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new TypeError(`Level should be of type number`);
  }
  if (level < 0) {
    throw new RangeError(`Level should not be negative value`);
  }
  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};


export const canContinue = (game) => game.lives > 0 && game.level <= Limit.LEVELS;

export const die = (game) => {
  const lives = game.lives - 1;
  return Object.assign({}, game, {
    lives
  });
};

// создает объект ответа и добавляет его в массив ответов
export const generateStats = (answerStatus, time, arr) => {
  const answerResult = {
    correctAnswer: answerStatus,
    answerTime: time
  };
  arr.push(answerResult);
  return arr;
};

// преобразует массив объектов ответов в массив вида [`fast`, `correct`]
export const convertAnswersArr = (arr) => {
  let results = arr.map((el) => {
    let answer;
    if (el.correctAnswer) {
      answer = el.answerTime < Limit.FAST_TIME ? `fast` : `correct`;
      answer = el.answerTime > Limit.SLOW_TIME ? `slow` : `correct`;
    } else {
      answer = `wrong`;
    }
    return answer;
  });
  return results;
};

// считает баллы за правильные ответы
export const countPointsForCorrect = (arr) => {
  const resultArr = arr.filter((el) => el.correctAnswer);
  const sum = resultArr.length * Rate.CORRECT_ANSWER_POINTS;
  return sum;
};

// считает количество быстрых ответов
export const countFastAnswers = (arr) => {
  const fastArr = arr.filter((el) => el.answerTime < Limit.FAST_TIME);
  const fasts = fastArr.length;
  return fasts;
};

// считает количество медленных ответов
export const countSlowAnswers = (arr) => {
  const fastArr = arr.filter((el) => el.answerTime > Limit.SLOW_TIME);
  const fasts = fastArr.length;
  return fasts;
};

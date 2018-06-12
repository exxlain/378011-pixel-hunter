export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};


export const canContinue = (game) => game.lives > 0 && game.level <= 10;

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
export const answerConvert = (answersArr) => {
  let results = [];
  let answer;
  answersArr.forEach((el) => {
    if (el.correctAnswer) {
      answer = el.answerTime < 10 ? `fast` : `correct`;
      answer = el.answerTime > 20 ? `slow` : `correct`;
    } else {
      answer = `wrong`;
    }
    results.push(answer);
  });

  return results;
};

// считает баллы за правильные ответы
export const sumTrue = (answersArr) => {
  const resultArr = answersArr.filter((el) => el.correctAnswer);
  const sum = resultArr.length * 100;
  return sum;
};

// считает количество быстрых ответов
export const numberFast = (answersArr) => {
  const fastArr = answersArr.filter((el) => el.answerTime < 10);
  const fasts = fastArr.length;
  return fasts;
};

// считает количество медленных ответов
export const numberSlow = (answersArr) => {
  const fastArr = answersArr.filter((el) => el.answerTime > 20);
  const fasts = fastArr.length;
  return fasts;
};

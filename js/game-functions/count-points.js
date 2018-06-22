import {Limit, Rate} from '../data/data';

const countPoints = (answers, lives) => {
  let sum = 0;
  if (answers.length < Limit.LEVELS) {
    sum = `Fail`;
  } else {
    sum = answers.reduce((previous, current) => {
      if (current.correctAnswer) {
        previous += Rate.CORRECT_ANSWER_POINTS;
        if (current.answerTime > Limit.TIME - Limit.FAST_TIME) {
          return previous + Rate.FAST_ANSWER_BONUS;
        } else if (current.answerTime < Limit.TIME - Limit.SLOW_TIME) {
          return previous - Rate.SLOW_ANSWER_FINE;
        }
      }
      return previous;
    }, 0);

    sum += lives * Rate.FOR_LIVE_BONUS;
  }
  return sum;
};

export default countPoints;

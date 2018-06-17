import {Limit, Rate} from '../data/data';

const countPoints = (answers, lives) => {
  let sum = 0;
  if (answers.length < Limit.LEVELS) {
    sum = -1;
  } else {
    answers.forEach((el) => {
      if (el.correctAnswer) {
        sum += Rate.CORRECT_ANSWER_POINTS;
        sum += el.answerTime < Limit.FAST_TIME ? Rate.FAST_ANSWER_BONUS : 0;
        sum -= el.answerTime > Limit.SLOW_TIME ? Rate.SLOW_ANSWER_FINE : 0;
      }
    });
    sum += lives * Rate.FOR_LIVE_BONUS;
  }
  return sum;
};

export default countPoints;

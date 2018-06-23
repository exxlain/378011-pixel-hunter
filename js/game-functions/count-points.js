import {Limit, Rate} from '../data/data';

const countPoints = (answers, lives) => {
  let sum = 0;
  if (answers.length < Limit.LEVELS) {
    sum = `Fail`;
  } else {
    sum = answers.reduce((previous, current) => {
      if (current !== `wrong`) {
        previous += Rate.CORRECT_ANSWER_POINTS;
        if (current === `fast`) {
          return previous + Rate.FAST_ANSWER_BONUS;
        } else if (current === `slow`) {
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

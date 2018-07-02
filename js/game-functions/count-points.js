import {Limit, Rate} from '../data/data';

const countPoints = (answers, lives) => {
  if (answers.length < Limit.LEVELS) {
    return `Fail`;
  }
  return answers.reduce((previous, current) => {
    if (current !== `wrong`) {
      previous += Rate.CORRECT_ANSWER_POINTS;
      if (current === `fast`) {
        return previous + Rate.FAST_ANSWER_BONUS;
      } else if (current === `slow`) {
        return previous - Rate.SLOW_ANSWER_FINE;
      }
    }
    return previous;
  }, 0) + lives * Rate.FOR_LIVE_BONUS;
};

export default countPoints;

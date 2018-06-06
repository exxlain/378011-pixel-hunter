const countPoints = (answers, lives) => {
  let sum = 0;
  if (answers.length < 10) {
    sum = -1;
  } else {
    answers.forEach((el) => {
      if (el.correctAnswer) {
        sum += 100;
        sum += el.answerTime < 10 ? 50 : 0;
        sum -= el.answerTime > 20 ? 50 : 0;
      }
    });
    sum += lives * 50;
  }
  return sum;
};

export default countPoints;

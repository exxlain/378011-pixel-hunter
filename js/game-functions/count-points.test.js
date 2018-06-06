import {assert} from 'chai';
import countPoints from './count-points';

// функция для генерации массивов ответов для тестов
const generateAnswersArr = (answeredQuestions, correct, slow, fast) => {
  const answersArr = [];
  for (let i = 0; i < answeredQuestions; i++) {
    answersArr[i] = {
      correctAnswer: false,
      answerTime: 0
    };
    if (correct > i) {
      answersArr[i].correctAnswer = true;
      if (slow > i) {
        answersArr[i].answerTime = 29;
      } else if (fast > i - slow) {
        answersArr[i].answerTime = 5;
      } else {
        answersArr[i].answerTime = 15;
      }
    }
  }
  return answersArr;
};

describe(`check points calculation`, () => {

  it(`should return -1, if not all questions are answered`, () => {
    const answersArr = generateAnswersArr(9, 0, 0, 0);
    assert.equal(countPoints(answersArr, 2), -1);
  });

  it(`should return 1150, if all answers are correct, three lives remain`, () => {
    const answersArr = generateAnswersArr(10, 10, 0, 0);
    assert.equal(countPoints(answersArr, 3), 1150);
  });

  it(`should return 1050, if all answers are correct, one live remain`, () => {
    const answersArr = generateAnswersArr(10, 10, 0, 0);
    assert.equal(countPoints(answersArr, 1), 1050);
  });

  it(`should return 1000, if all answers are correct, zero lives remain`, () => {
    const answersArr = generateAnswersArr(10, 10, 0, 0);
    assert.equal(countPoints(answersArr, 0), 1000);
  });

  it(`should return 500, if five questions are answered correctly, zero lives remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 0, 0);
    assert.equal(countPoints(answersArr, 0), 500);
  });

  it(`should return 650, if five questions are answered correctly, three lives remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 0, 0);
    assert.equal(countPoints(answersArr, 3), 650);
  });

  it(`should return 450, if five questions are answered correctly, one slow question, zero lives remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 1, 0);
    assert.equal(countPoints(answersArr, 0), 450);
  });

  it(`should return 500, if five questions are answered correctly, one slow question, one live remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 1, 0);
    assert.equal(countPoints(answersArr, 1), 500);
  });

  it(`should return 550, if five questions are answered correctly, one fast question, zero lives remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 0, 1);
    assert.equal(countPoints(answersArr, 0), 550);
  });

  it(`should return 600, if five questions are answered correctly, one fast question, one live remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 0, 1);
    assert.equal(countPoints(answersArr, 1), 600);
  });

  it(`should return 500, if five questions are answered correctly, one slow question, one fast question, zero lives remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 1, 1);
    assert.equal(countPoints(answersArr, 0), 500);
  });

  it(`should return 550, if five questions are answered correctly, one slow question, one fast question, one live remain`, () => {
    const answersArr = generateAnswersArr(10, 5, 1, 1);
    assert.equal(countPoints(answersArr, 1), 550);
  });
});


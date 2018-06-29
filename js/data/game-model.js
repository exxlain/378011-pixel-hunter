import {INITIAL_GAME, Limit} from './data';

const tick = (time) => {
  if (time > 0) {
    time--;
  }
  return time;
};

const generateState = (game) => {
  return Object.assign({}, game);
};

// создает объект ответа
const generateAnswerStat = (answerStatus, time) => {
  const answerResult = {
    correctAnswer: answerStatus,
    answerTime: time
  };
  return answerResult;
};

// преобразует массив объектов ответов в массив вида [`fast`, `correct`]
const convertAnswersArr = (arr) => {
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

class GameModel {
  constructor(data, playerName) {
    this.data = data;
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return this._state;
  }

  get answers() {
    return convertAnswersArr(this._answers);
  }

  generateTrueAnswer() {
    this._answers.push(generateAnswerStat(true, this._state.time));
  }

  generateFalseAnswer() {
    this._answers.push(generateAnswerStat(false, this._state.time));
  }

  goToNextLevel() {
    this._state.level++;
  }

  die() {
    this._state.lives--;
  }

  restart() {
    this._state = generateState(INITIAL_GAME);
    this._answers = [];
  }

  isDead() {
    return this._state.lives === 0;
  }

  isEnd() {
    return this._state.level === Limit.LEVELS;
  }

  getLevel(levelNumber) {
    return this.data[`game-${levelNumber}`];
  }

  getCurrentLevel() {
    return this.getLevel(this._state.level);
  }

  tick() {
    this._state.time = tick(this._state.time);
  }

  resetTime() {
    this._state.time = Limit.TIME;
  }

  isTimeEnd() {
    return this._state.time === 0;
  }
}

export default GameModel;

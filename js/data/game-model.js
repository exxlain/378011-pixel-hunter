import {INITIAL_GAME, Limit} from './data';
import Timer from '../game-functions/timer.js';
import {quests} from './quest-data.js';

const getLevel = (state) => quests[`game-${state.level}`];

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

const changeTime = (game, newTime) => {
  const newGame = Object.assign({}, game, {
    time: newTime
  });
  return newGame;
};

const die = (game) => {
  const lives = game.lives - 1;
  return Object.assign({}, game, {
    lives
  });
};

// создает объект ответа
const generateStats = (answerStatus, time) => {
  const answerResult = {
    correctAnswer: answerStatus,
    answerTime: time
  };
  return answerResult;
};


class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  get answers() {
    return this._answers;
  }

  generateTrueAnswer() {
    this._answers.push(generateStats(true, this._state.time));
  }

  generateFalseAnswer() {
    this._answers.push(generateStats(false, this._state.time));
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  die() {
    this._state = die(this._state);
  }

  restart() {
    this._state = INITIAL_GAME;
    this._answers = [];
  }

  isDead() {
    return this._state.lives <= 0;
  }

  isEnd() {
    return this._state.level > Limit.LEVELS;
  }

  getCurrentLevel() {
    return getLevel(this._state);
  }

  tick() {
    const newTimer = new Timer(this._state.time);
    newTimer.tick();
    this._state = changeTime(this._state, newTimer.time);
  }

  resetTime() {
    this._state = changeTime(this._state, Limit.TIME);
  }

  isTimeEnd() {
    return this._state.time === 0;
  }

}

export default GameModel;

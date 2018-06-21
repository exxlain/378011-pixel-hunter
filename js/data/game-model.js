import {INITIAL_GAME, Limit} from './data';
import {changeLevel, die, generateStats, changeTime} from '../game-functions/game-logic';
import Timer from '../game-functions/timer.js';
import {quests} from './quest-data.js';

const getLevel = (state) => quests[`game-${state.level}`];

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
    this._answers = generateStats(true, this._state.time, this._answers);
  }

  generateFalseAnswer() {
    this._answers = generateStats(false, this._state.time, this._answers);
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

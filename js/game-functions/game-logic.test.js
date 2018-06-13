import {assert} from 'chai';
import {INITIAL_GAME} from '../data/data';
import {changeLevel} from './game-logic';

describe(`Check level changer`, () => {

  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
    assert.equal(changeLevel(INITIAL_GAME, 102).level, 102);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, RangeError, `Level should not be negative value`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, TypeError, `Level should be of type number`);
  });

});

import {assert} from 'chai';
import Timer from './timer';

// callback для проверки работы
let end = false;
const reportTimerEnd = () => {
  end = true;
  return end;
};

describe(`check game timer`, () => {

  it(`should have time getter`, () => {
    const newTimer = new Timer(30, reportTimerEnd);
    assert.exists(newTimer.time);
  });

  it(`should update timer once`, () => {
    const newTimer = new Timer(3, reportTimerEnd);
    newTimer.tick();
    assert.equal(newTimer.time, 2);
  });

  it(`should update timer twice`, () => {
    const newTimer = new Timer(4, reportTimerEnd);
    newTimer.tick();
    newTimer.tick();
    assert.equal(newTimer.time, 2);
  });

  it(`should call back when time is over`, () => {
    end = false;
    const newTimer = new Timer(1, reportTimerEnd);
    newTimer.tick();
    assert.isTrue(end);
  });

  it(`shouldn't call back when time is not over`, () => {
    end = false;
    const newTimer = new Timer(30, reportTimerEnd);
    newTimer.tick();
    assert.isFalse(end);
  });

  it(`shouldn't call back, when we are trying to tick to negative values`, () => {
    end = false;
    assert.throws(() => new Timer(0, reportTimerEnd).tick(), RangeError, `Time shouldn't be 0 or negative value`);
    assert.isFalse(end);
  });

  it(`should throw error when we are trying to set negative values`, () => {
    assert.throws(() => new Timer(-30, reportTimerEnd), RangeError, `Time shouldn't be 0 or negative value`);
  });

  it(`should throw error when we are trying to tick to negative values`, () => {
    assert.throws(() => new Timer(0, reportTimerEnd).tick(), RangeError, `Time shouldn't be 0 or negative value`);
  });

  it(`should throw error when we are trying to set non number value`, () => {
    assert.throws(() => new Timer([], reportTimerEnd), TypeError, `Time should be of type number`);
  });
});

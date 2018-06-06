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

  it(`should not allow to set negative values`, () => {
    const newTimer = new Timer(-1, reportTimerEnd);
    assert.equal(newTimer.time, 0);
  });

  it(`should not allow to tick to negative values`, () => {
    const newTimer = new Timer(0, reportTimerEnd);
    newTimer.tick();
    assert.equal(newTimer.time, 0);
  });

  it(`should call back when time is over`, () => {
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
    const newTimer = new Timer(0, reportTimerEnd);
    newTimer.tick();
    assert.isFalse(end);
  });
});

import {assert} from 'chai';
import Timer from './timer';

// callback для проверки работы
let end = false;
const reportTimerEnd = () => {
  end = true;
  return end;
};

describe(`check game timer`, () => {

  it(`should has time getter`, () => {
    const newTimer = new Timer(30, reportTimerEnd);
    assert.exists(newTimer.time);
  });

  it(`should update timer one time`, () => {
    const newTimer = new Timer(3, reportTimerEnd);
    newTimer.tick();
    assert.equal(newTimer.time, 2);
  });

  it(`should update timer two times`, () => {
    const newTimer = new Timer(4, reportTimerEnd);
    newTimer.tick();
    newTimer.tick();
    assert.equal(newTimer.time, 2);
  });

  it(`should not allow set negative values`, () => {
    const newTimer = new Timer(-1, reportTimerEnd);
    assert.equal(newTimer.time, 0);
  });

  it(`should not allow to tick to negative values`, () => {
    const newTimer = new Timer(0, reportTimerEnd);
    newTimer.tick();
    assert.equal(newTimer.time, 0);
  });

  it(`should call back when the times is over`, () => {
    const newTimer = new Timer(1, reportTimerEnd);
    assert.isTrue(end);
    assert.equal(newTimer.time, 1);
  });
});

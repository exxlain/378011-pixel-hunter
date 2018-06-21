export default class Timer {
  constructor(time) {
    this.time = time;
  }

  get time() {
    return this._time;
  }
  set time(verifiedTime) {
    if (typeof verifiedTime !== `number`) {
      throw new TypeError(`Time should be of type number`);
    }
    if (verifiedTime <= 0) {
      throw new RangeError(`Time shouldn't be 0 or negative value`);
    }
    if (verifiedTime > 0) {
      this._time = verifiedTime;
    }
  }
  tick() {
    if (this._time > 0) {
      this._time--;
    }
  }
}


export default class Timer {
  constructor(time, callback) {
    this.time = time;
    this.callback = callback;
  }

  get time() {
    return this._time;
  }
  set time(verifiedTime) {
    if (typeof verifiedTime !== `number`) {
      throw new Error(`Time should be of type number`);
    }
    try {
      if (verifiedTime <= 0) {
        throw new Error(`Time shouldn't be 0 or negative value`);
      }
    } finally {
      if (verifiedTime > 0) {
        this._time = verifiedTime;
      }
    }
  }
  tick() {
    if (this._time > 0) {
      this._time--;
      if (this._time === 0) {
        this.callback();
      }
    }
  }
}


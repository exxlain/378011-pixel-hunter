export default class Timer {
  constructor(time, callback) {
    this.currentTime = time <= 0 ? 0 : time;
    this.callback = callback;
  }
  tick() {
    if (this.currentTime === 0) {
      this.callback();
    } else {
      this.currentTime--;
    }
  }

  get time() {
    return this.currentTime;
  }
}

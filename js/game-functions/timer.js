export default class Timer {
  constructor(time, callback) {
    this.currentTime = time >= 0 ? time : 0;
    this.callback = callback;
  }
  tick() {
    if (this.currentTime > 0) {
      this.currentTime--;
    }
    if (this.currentTime === 0) {
      this.callback();
    }
  }

  get time() {
    return this.currentTime;
  }
}


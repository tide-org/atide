'use babel';

export default class Log {

  static toCon(condition, message) {
    if (condition) {
      console.log(message);
    }
  }
}

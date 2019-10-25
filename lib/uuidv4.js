'use babel';

export default class UUIDv4 {

    static get() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
        var random = Math.random() * 16 | 0, value = char == 'x' ? random : (random & 0x3 | 0x8);
        return value.toString(16);
      });
    }

}

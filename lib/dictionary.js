'use babel';

export default class Dictionary {

    static dictionary = {};

    static set(dict) {
      Dictionary.dictionary = dict;
    }

    static get() {
      return Dictionary.dictionary;
    }

    static getVariables() {
      return Dictionary.dictionary["variables"];
    }

    static getSettings() {
      return Dictionary.dictionary["settings"];
    }
}

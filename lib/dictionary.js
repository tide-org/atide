'use babel';

import WorkspaceHandler from './workspace-handler';

export default class Dictionary {

    static dictionary = {};
    static startupComplete = false;

    static set(dict) {
      Dictionary.dictionary = dict;
    }

    static add(value) {
        valueKeys = Object.keys(value);
        if(valueKeys.indexOf('config_dictionary') > -1) {
          Dictionary.dictionary = Dictionary.mergeDeep(Dictionary.dictionary, value["config_dictionary"]);
        }
    }

    static isObject(item) {
      return (item && typeof item === 'object' && !Array.isArray(item));
    }

    static mergeDeep(target, source) {
      let output = Object.assign({}, target);
      if (Dictionary.isObject(target) && Dictionary.isObject(source)) {
        Object.keys(source).forEach(key => {
          if (Dictionary.isObject(source[key])) {
            if (!(key in target))
              Object.assign(output, { [key]: source[key] });
            else
              output[key] = Dictionary.mergeDeep(target[key], source[key]);
          } else {
            Object.assign(output, { [key]: source[key] });
          }
        });
      }
      return output;
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

    static getEvents() {
      return Dictionary.dictionary["events"];
    }
}

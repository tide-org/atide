const Dictionary = require('../lib/dictionary');

let requestObject = {
  "command": {
    "action": "set_full_config_dictionary",
    "value": {
      "settings": { "setting_a": "aaaa", "setting_b": "bbbb" },
      "variables": { "variable_c": "cccc", "variable_d": "dddd" }
    }
  },
  "sender": "tide",
  "receiver": "editor",
};

let requestObjectToAdd = {
  "command": {
    "action": "set_full_config_dictionary",
    "value": {
      "config_dictionary": {
        "variables": { "variable_e": "eeee", "variable_f": "ffff" }
      }
    }
  },
  "sender": "tide",
  "receiver": "editor",
};

describe('test dictionary class does as expected  ', () => {

  it('can have a dictionary added to it', () => {
      let dict = { "settings": "this is a test setting string" };
      Dictionary.set(dict);
      expect(Dictionary.get()["settings"]).toBe("this is a test setting string");
  });

  it('can retrieve settings', () => {
      let dict = { "settings": "this is a test setting string" };
      Dictionary.set(dict);
      expect(Dictionary.getSettings()).toBe("this is a test setting string");
  });

  it('can retrieve variables', () => {
      let dict = { 
        "settings": "this is a test setting string",
        "variables": {"a": 123, "b": 456 }
      };
      Dictionary.set(dict);
      expect(Dictionary.getVariables()["a"]).toBe(123);
  });

  it('can retrieve add items', () => {
      Dictionary.set(requestObject["command"]["value"]);
      Dictionary.add(requestObjectToAdd["command"]["value"]);
      let vars = Dictionary.getVariables();
      let varsKeys = Object.keys(vars);
      expect(varsKeys.indexOf('variable_c')).not.toBe(-1);
      expect(varsKeys.indexOf('variable_d')).not.toBe(-1);
      expect(varsKeys.indexOf('variable_e')).not.toBe(-1);
      expect(varsKeys.indexOf('variable_f')).not.toBe(-1);
  });

});

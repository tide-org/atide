const Request = require('../lib/request');

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

describe('test request class does as expected  ', () => {

  it('can have a valid json string passed to it', () => {
      let requestString = JSON.stringify(requestObject);
      let request = new Request(requestString);
      let isValidRequest = request.isValidRequest();
      expect(isValidRequest).toBe(true);
  });

  it('can get the action name', () => {
      let requestString = JSON.stringify(requestObject);
      let request = new Request(requestString);
      let action = request.getAction();
      expect(action).toBe("set_full_config_dictionary");
  });

  it('can get the action value', () => {
      let requestString = JSON.stringify(requestObject);
      let request = new Request(requestString);
      let valueObject = request.getValue();
      let valueKeys = Object.keys(valueObject);
      expect(valueKeys.indexOf("settings")).not.toBe(-1);
      expect(valueKeys.indexOf("variables")).not.toBe(-1);
  });

});

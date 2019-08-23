const Request = require('../lib/request');

describe('test request class does as expected  ', () => {

  it('can have a valid json string passed to it', () => {

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
      let requestString = JSON.stringify(requestObject);
      let request = new Request(requestString);
      let isValidRequest = request.isValidRequest();
      expect(isValidRequest).toBe(true);
  });

});

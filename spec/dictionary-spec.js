const Dictionary = require('../lib/dictionary');

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

});

const { PythonShell } = require('../lib/python-shell');

describe('', () => {
  it('returns hello from the command', () => {
    PythonShell.runString('x=1+1;print(x)', null, function (err) {
      if (err) throw err;
      expect(err).toBe(null);
      console.log('finished');
    });
  });
});

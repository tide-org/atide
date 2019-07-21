const { PythonShell } = require('../lib/python-shell');

describe('', () => {
  it('pyshell completes without error', () => {
    PythonShell.runString('x=1+1;print(x)', null, function (err) {
      if (err) throw err;
      expect(err).toBe(null);
      console.log('finished');
    });
  });
});

describe('', () => {
  it('pyshell completes without error running a script', () => {
		PythonShell.run('./my_script.py', null, function (err) {
			if (err) throw err;
      expect(err).toBe(null);
			console.log('finished');
		});
  });
});

const { PythonShell } = require('../lib/python-shell');

describe('', () => {
  it('pyshell completes without error', () => {
    PythonShell.runString('x=1+1;print(x)', null, (err) => {
      if (err) throw err;
      expect(err).toBe(null);
      console.log('finished');
    });
  });
});

describe('', () => {
  it('pyshell completes without error running a script', () => {
		let pyshell = new PythonShell('my_script.py');
    let printResult = false;
		pyshell.send('hello');
		pyshell.end( (err,code,signal) => {
			if (err) throw err;
      if (printResult) {
			  console.log('err: ' + err);
			  console.log('The exit code was: ' + code);
			  console.log('The exit signal was: ' + signal);
			  console.log('finished');
      };
		});
    pyshell.on('message', function (message) {
      expect(message).not.toBeNull();
      if (printResult) {
			  console.log("message: " + message);
      };
    });
  });
});

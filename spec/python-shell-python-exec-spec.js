const { PythonShell } = require('../lib/python-shell');

describe('', () => {
  it('', () => {
		let pyshell = new PythonShell('../lib/python-exec.py');
    let printResult = true;
		pyshell.send('print("hello")');
		pyshell.end( (err, code, signal) => {
			if (err) throw err;
      if (printResult) {
			  console.log('finished');
      };
		});
    pyshell.on('message', (message) => {
      if (!message.startsWith('<stdin>') && !message.startsWith('<stdout>')) {
        expect(message).toBe('hello');
      };
      if (printResult) {
	  		console.log("message: " + message);
      };
    });
  });
});

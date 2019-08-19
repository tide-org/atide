const { PythonShell } = require('../lib/python-shell');

describe('', () => {
  it('starts a python script that returns what is sent to it from a print statement', () => {
		let pyshell = new PythonShell('../lib/python/python-exec.py');
    let printResult = false;
		pyshell.send('print("hello")');
		pyshell.end( (err, code, signal) => {
			if (err) throw err;
		});
    pyshell.on('message', (message) => {
      if (!message.startsWith('<stdin>') &&
          !message.startsWith('<stdout>') &&
          !message.startsWith('</stdin>') &&
          !message.startsWith('</stdout>') &&
          !message.startsWith('print(') &&
          !message == '') {
        expect(message).toBe('hello');
      };
      if (printResult) {
	  		console.log("message: " + message);
      };
    });
  });
});

describe('', () => {
  it('starts a python script that returns what is sent to it from a print statement', () => {
		let pyshell = new PythonShell('../lib/python/python-exec.py');
    let printResult = false;
		pyshell.send('print("hello")');
		pyshell.end( (err, code, signal) => {
			if (err) throw err;
		});
    pyshell.on('message', (message) => {
      if (!message.startsWith('<stdin>') &&
          !message.startsWith('<stdout>') &&
          !message.startsWith('</stdin>') &&
          !message.startsWith('</stdout>') &&
          !message.startsWith('print(') &&
          !message == '') {
        expect(message).toBe('hello');
      };
      if (printResult) {
	  		console.log("message: " + message);
      };
    });
  });
});

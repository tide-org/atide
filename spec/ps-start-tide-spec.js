const { PythonShell } = require('../lib/python-shell');

describe('', () => {

  beforeEach((done) => {
    done();
  }, 1000);

  it('starts a python script that runs tide.', (done) => {
    let printResult = false;
    let result = '';
    let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: '../lib/python',
      args: []
    };

    let pyshell = PythonShell.run('start-tide.py', options);

		pyshell.end( (err, code, signal) => {
			if (err) throw err;
      if (printResult) {
			  console.log('finished');
        console.log("full message:" + this.result);
      };
      done();
		});
    pyshell.on('message', (message) => {
      this.result += message + '\n';
      if (message.startsWith('hello')) {
        expect(message).toBe('hello');
      };
      if (printResult) {
	  		console.log("message: " + message);
      };
    });
    console.log("RESULT:" + this.result);
  }, 10000);

  afterEach((done) => {
    done();
  }, 1000);

});

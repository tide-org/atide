const { PythonShell } = require('../lib/python-shell');


function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  };
  return true;
};

let options = {
  mode: 'text',
  pythonOptions: ['-u'],
  scriptPath: '../lib/python',
  args: []
};

describe('tide async', () => {
  beforeEach((done) => {
    done();
  }, 1000);

  it('starts a python script that runs tide.', (done) => {
    let messageCount = 0;

    let pyshell = PythonShell.run('start-tide.py', options);

    pyshell.on('message', (message) => {
      if (isJson(message)) {
        messageCount += 1;
      }
    });

		pyshell.end( (err, code, signal) => {
			if (err) throw err;
      expect(messageCount).toBe(3);
      done();
		});

  }, 10000);

  afterEach((done) => {
    done();
  }, 1000);

});

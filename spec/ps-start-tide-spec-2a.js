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

  it('starts a python script that runs tide and has 3 json objects return', (done) => {
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

  it('starts a python script that runs tide and has the first object return have a command key', (done) => {
    let messageCount = 0;
    let jsonObject = {};
    let pyshell = PythonShell.run('start-tide.py', options);
    pyshell.on('message', (message) => {
      if (isJson(message)) {
          messageCount += 1;
          if (messageCount == 1) {
            jsonObject = JSON.parse(message);
          }
      }
    });
		pyshell.end( (err, code, signal) => {
			if (err) throw err;
      expect(Object.keys(jsonObject)[0]).toBe('command');
      done();
		});
  }, 10000);

  afterEach((done) => {
    done();
  }, 1000);

});

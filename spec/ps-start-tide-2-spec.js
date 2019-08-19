const { PythonShell } = require('../lib/python-shell');

process.env['TIDE_CONFIG_LOCATION'] = '/Users/willvk/Source/wilvk/tide-plugins/plugins/test_c-stdio/'; // TODO: run in a container

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

  it(`starts a python script that runs tide and has 3
      json objects return`, (done) => {
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

  it(`starts a python script that runs tide and has the first
      object return have a command key`, (done) => {
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

  it(`starts a python script that runs tide and has the first object
      return have a command key with an action key`, (done) => {
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
      expect(Object.keys(jsonObject["command"])[0]).toBe('action');
      done();
		});
  }, 10000);

  it(`starts a python script that runs tide and has the first object
      return have a command key with a value key`, (done) => {
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
      expect(Object.keys(jsonObject["command"])[1]).toBe('value');
      done();
		});
  }, 10000);

  it(`starts a python script that runs tide and has the first object return
      have a command key with an action key with value "set_full_config_dictionary"`, (done) => {
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
      expect(jsonObject["command"]["action"]).toBe('set_full_config_dictionary');
      done();
		});
  }, 10000);

  it(`starts a python script that runs tide and has the first object return have 
      a command key with command.value keys of: 
      settings,buffers,events,variables,commands `, (done) => {
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
      actionValue = jsonObject["command"]["value"];
      actionValueKeys = Object.keys(actionValue);
      expect(actionValueKeys.indexOf('settings')).not.toEqual(-1);
      expect(actionValueKeys.indexOf('buffers')).not.toEqual(-1);
      expect(actionValueKeys.indexOf('events')).not.toEqual(-1);
      expect(actionValueKeys.indexOf('variables')).not.toEqual(-1);
      expect(actionValueKeys.indexOf('commands')).not.toEqual(-1);
      done();
		});
  }, 10000);

  afterEach((done) => {
    done();
  }, 1000);

});

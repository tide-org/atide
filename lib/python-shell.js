"use strict";

var __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {

  return new(P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    };

    function step(result) {
      result.done ? resolve(result.value) : new P((resolve) => {
        resolve(result.value);
      }).then(fulfilled, rejected);
    };

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
});

Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = require("events");
const child_process_1 = require("child_process");
const os_1 = require("os");
const path_1 = require("path");
const fs_1 = require("fs");
const util_1 = require("util");

function toArray(source) {
  if (typeof source === 'undefined' || source === null) {
    return [];
  } else if (!Array.isArray(source)) {
    return [source];
  }
  return source;
};

function extend(obj, ...args) {
  Array.prototype.slice.call(arguments, 1).forEach(function(source) {
    if (source) {
      for (let key in source) {
        obj[key] = source[key];
      }
    }
  });
  return obj;
};

function getRandomInt() {
  return Math.floor(Math.random() * 10000000000);
}

class PythonShellError extends Error {};

exports.PythonShellError = PythonShellError;

class PythonShell extends events_1.EventEmitter {

  constructor(scriptPath, options) {
    super();

    function resolve(type, val) {
      if (typeof val === 'string') {
        return PythonShell[type][val];
      } else if (typeof val === 'function') {
        return val;
      }
    };

    if (scriptPath.trim().length == 0) {
      throw Error("scriptPath cannot be empty! You must give a script for python to run");
    }

    let self = this;
    let errorData = '';
    events_1.EventEmitter.call(this);
    options = extend({}, PythonShell.defaultOptions, options);
    let pythonPath;

    if (!options.pythonPath) {
      pythonPath = PythonShell.defaultPythonPath;
    } else {
      pythonPath = options.pythonPath;
    }

    let pythonOptions = toArray(options.pythonOptions);
    let scriptArgs = toArray(options.args);
    this.scriptPath = path_1.join(options.scriptPath || '', scriptPath);
    this.command = pythonOptions.concat(this.scriptPath, scriptArgs);
    this.mode = options.mode || 'text';
    this.formatter = resolve('format', options.formatter || this.mode);
    this.parser = resolve('parse', options.parser || this.mode);
    this.stderrParser = resolve('parse', options.stderrParser || this.mode);
    this.terminated = false;
    this.childProcess = child_process_1.spawn(pythonPath, this.command, options);

    ['stdout', 'stdin', 'stderr'].forEach((name) => {
      self[name] = self.childProcess[name];
      self.parser && self[name].setEncoding(options.encoding || 'utf8');
    });

    if (this.parser) {
      this.stdout.on('data', this.receive.bind(this));
    }

    this.stderr.on('data', (data) => {
      errorData += '' + data;
      self.receiveStderr(data);
    });

    this.stderr.on('end', () => {
      self.stderrHasEnded = true;
      terminateIfNeeded();
    });

    this.stdout.on('end', () => {
      self.stdoutHasEnded = true;
      terminateIfNeeded();
    });

    this.childProcess.on('exit', (code, signal) => {
      self.exitCode = code;
      self.exitSignal = signal;
      terminateIfNeeded();
    });

    function terminateIfNeeded() {

      if (!self.stderrHasEnded || !self.stdoutHasEnded || (self.exitCode == null && self.exitSignal == null)) {
        return;
      }

      let err;

      if (self.exitCode && self.exitCode !== 0) {

        if (errorData) {
          err = self.parseError(errorData);
        } else {
          err = new PythonShellError('process exited with code ' + self.exitCode);
        }

        err = extend(err, {
          executable: pythonPath,
          options: pythonOptions.length ? pythonOptions : null,
          script: self.scriptPath,
          args: scriptArgs.length ? scriptArgs : null,
          exitCode: self.exitCode
        });

        if (self.listeners('error').length || !self._endCallback) {
          self.emit('error', err);
        }
      }

      self.terminated = true;
      self.emit('close');
      self._endCallback && self._endCallback(err, self.exitCode, self.exitSignal);
    };
  };

  static checkSyntax(code) {
    return __awaiter(this, void 0, void 0, function*() {
      const randomInt = getRandomInt();
      const filePath = os_1.tmpdir() + path_1.sep + `pythonShellSyntaxCheck${randomInt}.py`;
      return new Promise((resolve, reject) => {
        fs_1.writeFile(filePath, code, (err) => {
          if (err) {
            reject(err);
          }
          resolve(this.checkSyntaxFile(filePath));
        });
      });
    });
  };

  static checkSyntaxFile(filePath) {
    return __awaiter(this, void 0, void 0, function*() {
      let compileCommand = `${this.defaultPythonPath} -m py_compile ${filePath}`;

      return new Promise((resolve, reject) => {
        child_process_1.exec(compileCommand, (error, stdout, stderr) => {
          if (error == null) {
            resolve();
          } else {
            reject(stderr);
          }
        });
      });
    });
  };

  static run(scriptPath, options, callback) {
    let pyshell = new PythonShell(scriptPath, options);
    let output = [];

    return pyshell.on('message', (message) => {
      output.push(message);
    }).end((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null, output.length ? output : null);
    });
  };

  static runString(code, options, callback) {
    const randomInt = getRandomInt();
    const filePath = os_1.tmpdir + path_1.sep + `pythonShellFile${randomInt}.py`;

    fs_1.writeFileSync(filePath, code);

    return PythonShell.run(filePath, options, callback);
  };

  static getVersion(pythonPath) {
    if (!pythonPath) {
      pythonPath = this.defaultPythonPath;
    }
    const execPromise = util_1.promisify(child_process_1.exec);

    return execPromise(pythonPath + " --version");
  };

  static getVersionSync(pythonPath) {
    if (!pythonPath) {
      pythonPath = this.defaultPythonPath;
    }

    return child_process_1.execSync(pythonPath + " --version").toString();
  };

  parseError(data) {
    let text = '' + data;
    let error;

    if (/^Traceback/.test(text)) {
      let lines = ('' + data).trim().split(new RegExp(os_1.EOL, 'g'));
      let exception = lines.pop();
      error = new PythonShellError(exception);
      error.traceback = data;
      error.stack += os_1.EOL + '    ----- Python Traceback -----' + os_1.EOL + '  ';
      error.stack += lines.slice(1).join(os_1.EOL + '  ');
    } else {
      error = new PythonShellError(text);
    }

    return error;
  };

  send(message) {
    let data = this.formatter ? this.formatter(message) : message;

    if (this.mode !== 'binary') {
      data += os_1.EOL;
    }

    this.stdin.write(data);

    return this;
  };

  receive(data) {
    return this.recieveInternal(data, 'message');
  };

  receiveStderr(data) {
    return this.recieveInternal(data, 'stderr');
  };

  recieveInternal(data, emitType) {
    let self = this;
    let parts = ('' + data).split(new RegExp(os_1.EOL, 'g'));

    if (parts.length === 1) {
      this._remaining = (this._remaining || '') + parts[0];
      return this;
    }

    let lastLine = parts.pop();
    parts[0] = (this._remaining || '') + parts[0];
    this._remaining = lastLine;

    parts.forEach((part) => {
      if (emitType == 'message') {
        self.emit(emitType, self.parser(part));
      } else if (emitType == 'stderr') {
        self.emit(emitType, self.stderrParser(part));
      }
    });

    return this;
  };

  end(callback) {
    this.childProcess.stdin.end();
    this._endCallback = callback;

    return this;
  };

  terminate(signal) {
    this.childProcess.kill(signal);
    this.terminated = true;

    return this;
  };
}

PythonShell.defaultPythonPath = ( process.platform != "win32" ? "python3" : "py" );
PythonShell.defaultOptions = {};

PythonShell.format = {
  text: function toText(data) {
    if (!data) {
      return '';
    } else if (typeof data !== 'string') {
      return data.toString();
    }
    return data;
  },
  json: function toJson(data) {
    return JSON.stringify(data);
  }
};

PythonShell.parse = {
  text: function asText(data) {
    return data;
  },
  json: function asJson(data) {
    return JSON.parse(data);
  }
};

exports.PythonShell = PythonShell;

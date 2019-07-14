'use babel';

util = require("util");
exec = require("child_process").exec;
spawn = require('child_process').spawn,
execProm = util.promisify(exec);

export default class ProcessController {

  childProcess: undefined;

  constructor() {}

	async runQuickProcess(command) {
		 let result;

		 try {
			 result = await execProm(command);
		 } catch(ex) {
				result = ex;
		 }

		 if ( Error[Symbol.hasInstance](result) ) {
				 return ;
     }

		 return result;
	}

  startProcess(command, stdoutCallback) {
    console.log("in startProcess");
    this.childProcess = spawn(command);
    this.childProcess.stdin.setEncoding('utf-8');
    this.childProcess.stdout.pipe(process.stdout);
    this.addStdoutCallback(stdoutCallback);
    console.log("exiting startProcess");
  }

  writeToProcess(stdinString) {
    this.childProcess.stdin.write(stdinString + "\n");
    child.stdin.end();
  }
  
  addStdoutCallback(callback) {
    console.log("adding stdout callback");
    this.childProcess.stdout.on('data', callback);
  }

  addStderrCallback(callback) {
    this.childProcess.stderr.on('data', callback);
  }

  addExitCallback(callback) {
    this.childProcess.on('exit', callback);
  }

  stopProcess() {
  }

}


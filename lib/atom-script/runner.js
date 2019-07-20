'use babel';

import { Emitter, BufferedProcess } from 'atom';
import fs from 'fs';
import path from 'path';

export default class Runner {

  constructor() {
    this.bufferedProcess = null;
    this.stdoutFunc = this.stdoutFunc.bind(this);
    this.stderrFunc = this.stderrFunc.bind(this);
    this.onExit = this.onExit.bind(this);
    this.createOnErrorFunc = this.createOnErrorFunc.bind(this);
    this.emitter = new Emitter();
    this.command = null;
    this.args = [];
    this.workingDirectory = null;
  }

  run(command, args, workingDirectory = null) {
    this.startTime = new Date();

    this.command = command;
    this.args = args;
    this.workingDirectory = workingDirectory;

    const options = this.options();
    const stdout = this.stdoutFunc;
    const stderr = this.stderrFunc;
    const exit = this.onExit;

    this.bufferedProcess = new BufferedProcess({
      command, args, options, stdout, stderr, exit,
    });

    this.bufferedProcess.onWillThrowError(this.createOnErrorFunc(command));
  }

  getRunParameters() {
    return {
      'command': this.command,
      'args': this.args,
      'workingDirectory': this.workingDirectory
    };
  }

  writeToStdin(inputString) {
    if (this.bufferedProcess && inputString) {
      this.bufferedProcess.process.stdin.write(inputString);
      this.bufferedProcess.process.stdin.end();
    };
  }

  stdoutFunc(output) {
    this.emitter.emit('did-write-to-stdout', { message: output });
  }

  onDidWriteToStdout(callback) {
    return this.emitter.on('did-write-to-stdout', callback);
  }

  stderrFunc(output) {
    this.emitter.emit('did-write-to-stderr', { message: output });
  }

  onDidWriteToStderr(callback) {
    return this.emitter.on('did-write-to-stderr', callback);
  }

  destroy() {
    this.emitter.dispose();
  }

  getCwd() {
    let cwd = null;
    switch (atom.config.get('script.cwdBehavior')) {
      case 'First project directory': {
        const paths = atom.project.getPaths();
        if (paths && paths.length > 0) {
          try {
            cwd = fs.statSync(paths[0]).isDirectory() ? paths[0] : path.join(paths[0], '..');
          } catch (error) { /* Don't throw */ }
        }
        break;
      }
      case 'Project directory of the script': {
        cwd = this.getProjectPath();
        break;
      }
      case 'Directory of the script': {
        const pane = atom.workspace.getActivePaneItem();
        cwd = (pane && pane.buffer && pane.buffer.file && pane.buffer.file.getParent &&
               pane.buffer.file.getParent() && pane.buffer.file.getParent().getPath &&
               pane.buffer.file.getParent().getPath()) || '';
        break;
      }
    }
    return cwd;
  }

  stop() {
    if (this.bufferedProcess) {
      this.bufferedProcess.kill();
      this.bufferedProcess = null;
    }
  }

  onExit(returnCode) {
    this.bufferedProcess = null;
    let executionTime;

    if ((atom.config.get('script.enableExecTime') === true) && this.startTime) {
      executionTime = (new Date().getTime() - this.startTime.getTime()) / 1000;
    }

    this.emitter.emit('did-exit', { executionTime, returnCode });
  }

  onDidExit(callback) {
    return this.emitter.on('did-exit', callback);
  }

  createOnErrorFunc(command) {
    return (nodeError) => {
      this.bufferedProcess = null;
      this.emitter.emit('did-not-run', { command });
      nodeError.handle();
    };
  }

  onDidNotRun(callback) {
    return this.emitter.on('did-not-run', callback);
  }

  options() {
    return {
      cwd: this.getCwd(),
      env: process.env,
    };
  }

  getProjectPath() {
    const filePath = atom.workspace.getActiveTextEditor().getPath();
    const projectPaths = atom.project.getPaths();
    for (const projectPath of projectPaths) {
      if (filePath.indexOf(projectPath) > -1) {
        if (fs.statSync(projectPath).isDirectory()) {
          return projectPath;
        }
        return path.join(projectPath, '..');
      }
    }
    return null;
  }
}

'use babel';

import { Emitter } from 'atom';

import _ from 'underscore';

import CommandContext from './command-context';

export default class Runtime {

  constructor(runner, observers = []) {
    this.runner = runner;
    this.observers = observers;
    this.emitter = new Emitter();
    this.scriptOptions = this.runner.scriptOptions;
    _.each(this.observers, observer => observer.observe(this));
  }

  // Public: Adds a new observer and asks it to listen for {Runner} events
  //
  // An observer should have two methods:
  // * `observe(runtime)` - in which you can subscribe to {Runtime} events
  // (see {ViewRuntimeObserver} for what you are expected to handle)
  // * `destroy` - where you can do your cleanup
  addObserver(observer) {
    this.observers.push(observer);
    observer.observe(this);
  }

  destroy() {
    this.stop();
    this.runner.destroy();
    _.each(this.observers, observer => observer.destroy());
    this.emitter.dispose();
  }

  execute(input = null, options = null) {
    this.emitter.emit('start');

    const executionOptions = !options ? this.scriptOptions : options;
    const commandContext = CommandContext.build(this, executionOptions);

    if (!commandContext) return;

    if (commandContext.workingDirectory) {
      executionOptions.workingDirectory = commandContext.workingDirectory;
    }

    this.runner.scriptOptions = executionOptions;
    this.runner.run(commandContext.command, commandContext.args, codeContext, input);
    this.emitter.emit('started', commandContext);
  }

  stop() {
    this.emitter.emit('stop');
    this.runner.stop();
    this.emitter.emit('stopped');
  }

  onStart(callback) {
    return this.emitter.on('start', callback);
  }

  onStarted(callback) {
    return this.emitter.on('started', callback);
  }

  onStop(callback) {
    return this.emitter.on('stop', callback);
  }

  onStopped(callback) {
    return this.emitter.on('stopped', callback);
  }

  onDidWriteToStdout(callback) {
    return this.runner.onDidWriteToStdout(callback);
  }

  onDidWriteToStderr(callback) {
    return this.runner.onDidWriteToStderr(callback);
  }

  onDidExit(callback) {
    return this.runner.onDidExit(callback);
  }

  onDidNotRun(callback) {
    return this.runner.onDidNotRun(callback);
  }
}

'use babel';

import { Emitter } from 'atom';

import _ from 'underscore';

import CommandContext from './command-context';

export default class Runtime {

  // Public: Initializes a new {Runtime} instance
  //
  // This class is responsible for properly configuring {Runner}
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

  // Public: disposes dependencies
  //
  // This should be called when you no longer need to use this class
  destroy() {
    this.stop();
    this.runner.destroy();
    _.each(this.observers, observer => observer.destroy());
    this.emitter.dispose();
  }

  // Public: Executes code
  //
  // argType (Optional) - {String} One of the three:
  // * "Selection Based" (default)
  // * "Line Number Based"
  // * "File Based"
  // input (Optional) - {String} that'll be provided to the `stdin` of the new process
  execute(argType = 'Selection Based', input = null, options = null) {
    if (atom.config.get('script.stopOnRerun')) this.stop();
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

  // Public: stops execution of the current fork
  stop() {
    this.emitter.emit('stop');
    this.runner.stop();
    this.emitter.emit('stopped');
  }

  // Public: Dispatched when the execution is starting
  onStart(callback) {
    return this.emitter.on('start', callback);
  }

  // Public: Dispatched when the execution is started
  onStarted(callback) {
    return this.emitter.on('started', callback);
  }

  // Public: Dispatched when the execution is stopping
  onStop(callback) {
    return this.emitter.on('stop', callback);
  }

  // Public: Dispatched when the execution is stopped
  onStopped(callback) {
    return this.emitter.on('stopped', callback);
  }

  // Public: Dispatched when the process you run writes something to stdout
  // message - {String} with the output
  onDidWriteToStdout(callback) {
    return this.runner.onDidWriteToStdout(callback);
  }

  // Public: Dispatched when the process you run writes something to stderr
  // message - {String} with the output
  onDidWriteToStderr(callback) {
    return this.runner.onDidWriteToStderr(callback);
  }

  // Public: Dispatched when the process you run exits
  // returnCode  - {Number} with the process' exit code
  // executionTime  - {Number} with the process' exit code
  onDidExit(callback) {
    return this.runner.onDidExit(callback);
  }

  // Public: Dispatched when the code you run did not manage to run
  // command - {String} with the run command
  onDidNotRun(callback) {
    return this.runner.onDidNotRun(callback);
  }
}

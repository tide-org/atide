'use babel';

export default class CommandContext {
  constructor() {
    this.command = null;
    this.workingDirectory = null;
    this.args = [];
    this.options = {};
  }

  static build(runtime, runOptions) {
    const commandContext = new CommandContext();
    commandContext.options = runOptions;

    if (!runOptions.cmd) {
      commandContext.command = ''; 
    } else {
      commandContext.command = runOptions.cmd;
    }

    commandContext.args = ''; 

    if (!runOptions.workingDirectory) {
      commandContext.workingDirectory = ''; 
    } else {
      commandContext.workingDirectory = runOptions.workingDirectory;
    }

    // Return setup information
    return commandContext;
  }

  quoteArguments(args) {
    return args.map(arg => (arg.trim().indexOf(' ') === -1 ? arg.trim() : `'${arg}'`));
  }

  getRepresentation() {
    if (!this.command || !this.args.length) return '';

    // command arguments
    const commandArgs = this.options.cmdArgs ? this.quoteArguments(this.options.cmdArgs).join(' ') : '';

    return this.command.trim() +
      (commandArgs ? ` ${commandArgs}` : '')
  }
}

'use babel';

export default class ProcessController {

  constructor() {}

  runQuickProcess(commandLine) {
    exec = require("child_process").exec
    child = undefined
    commandResults = undefined

    child = exec(
      commandLine,
      (error, stdout, stderr) => {
          commandResults = {
              "stdout": stdout,
              "stderr": stderr,
              "exec_error": error
          }
      }
    )
    return commandResults;
  }

  stopProcess() {
  }

}


'use babel';

import Dictionary from './dictionary';
import { spawn } from "child_process";
import TideRequestHandler from './tide-request-handler';
import Config from './config';
import Log from './log';

export default class PyshellContainer {

    static process = null;
    static scriptPath = Config.tideScriptPath;
    static readBuffer = '';

    static init() {
      let configLocation = Config.tideConfigLocation; 
      process.env['TIDE_CONFIG_LOCATION'] = configLocation; 
      Log.toCon(Config.displayStartupMessages, "Spawning tide..."); 
      Log.toCon(Config.displayStartupMessages, ("CONFIG LOCATION: " + configLocation)); 
      PyshellContainer.process = spawn(Config.pythonProcessName, [PyshellContainer.scriptPath]);
      PyshellContainer.setupReadHandlers();
      PyshellContainer.process.on('exit', (code) => {
        Log.toCon(Config.displayExitMessages, "here too soon."); 
      });
    };

    static setupReadHandlers() {
      PyshellContainer.process.stdout.on('data', (message) => {
        Log.toCon(Config.displayReadMessages, ("READING MESSAGE: " + message));
        PyshellContainer.readBuffer += message;
        if (String.fromCharCode(message.slice(-1)[0]) == '\n') {
          Log.toCon(Config.displayReadMessages, "HANDLING MESSAGE.");
          TideRequestHandler.handle(PyshellContainer.readBuffer);
          PyshellContainer.readBuffer = '';
        } 
      });
    };

    static write(message) {
      Log.toCon(Config.displayWriteMessages, ("WRITING MESSAGE:" + message));
      PyshellContainer.process.stdin.write(message + '\n');
    };
}

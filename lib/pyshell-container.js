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
      PyshellContainer.setupConfigLocation();
      PyshellContainer.spawnTide();
      PyshellContainer.setupReadHandlers();
      PyshellContainer.setupExitHandler();
    };

    static spawnTide() {
      Log.toCon(Config.displayStartupMessages, "Spawning tide...");
      PyshellContainer.process = spawn(Config.pythonProcessName, [PyshellContainer.scriptPath]);
    };

    static setupConfigLocation() {
      let configLocation = Config.tideConfigLocation; 
      process.env['TIDE_CONFIG_LOCATION'] = configLocation; 
      Log.toCon(Config.displayStartupMessages, ("CONFIG LOCATION: " + configLocation)); 
    };

    static setupExitHandler() {
      PyshellContainer.process.on('exit', (code) => {
        Log.toCon(Config.displayExitMessages, "exited tide.");
      });
    };

    static terminate() {
      PyshellContainer.process.kill('SIGINT');
      PyshellContainer.process = null;
    }

    static setupReadHandlers() {
      PyshellContainer.process.stdout.on('data', (message) => {
        Log.toCon(Config.displayReadMessages, ("READING MESSAGE: " + message));
        PyshellContainer.readBuffer += message;
        PyshellContainer.checkHandleFullMessage(message);
      });
    };

    static checkHandleFullMessage(message) {
      if (String.fromCharCode(message.slice(-1)[0]) == '\n') {
        Log.toCon(Config.displayReadMessages, "HANDLING MESSAGE.");
        TideRequestHandler.handle(PyshellContainer.readBuffer);
        PyshellContainer.readBuffer = '';
      }
    }

    static write(message) {
      Log.toCon(Config.displayWriteMessages, ("WRITING MESSAGE:" + message));
      PyshellContainer.process.stdin.write(message + '\n');
    };
}

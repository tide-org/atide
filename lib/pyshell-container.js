'use babel';

import Dictionary from './dictionary';
import { spawn } from "child_process";
import TideRequestHandler from './tide-request-handler';

export default class PyshellContainer {

    static process = null;
    static scriptPath = atom.packages.getPackageDirPaths() + '/atide/lib/python/start-tide.py';
    static processName = 'python3';
    static printMessages = true;

    static init() {
      let configLocation = '/Users/willvk/source/wilvk/tide-plugins/plugins/atom/test_c';
      process.env['TIDE_CONFIG_LOCATION'] = configLocation; 
      console.log("CONFIG LOCATION: " + configLocation);
      console.log("SPAWNING...");
      PyshellContainer.process = spawn(PyshellContainer.processName, [PyshellContainer.scriptPath]);
      PyshellContainer.setupReadHandlers();
      PyshellContainer.process.on('exit', (code) => {
        console.log("here too soon.");
      });
    };

    static setupReadHandlers() {
      PyshellContainer.process.stdout.on('data', (message) => {
        if (PyshellContainer.printMessages) {
          console.log("READING MESSAGE: " + message);
        };
        TideRequestHandler.handle(message);
      });
    };

    static write(message) {
      if (PyshellContainer.printMessages) {
        console.log("WRITING MESSAGE: " + message);
      };
      PyshellContainer.process.stdin.write(message + '\n');
    };
}

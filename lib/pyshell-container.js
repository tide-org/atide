'use babel';

import Dictionary from './dictionary';
import { spawn } from "child_process";
import RequestHandler from './request-handler';

export default class PyshellContainer {

    static process = null;

    static scriptPath = atom.packages.getPackageDirPaths() + '/atide/lib/python/start-tide.py';

    static processName = 'python3';

    static init() {
      process.env['TIDE_CONFIG_LOCATION'] = '/Users/willvk/Source/wilvk/tide-plugins/plugins/atom/test_c/';
      console.log("SPAWNING...");
      PyshellContainer.process = spawn(PyshellContainer.processName, [PyshellContainer.scriptPath]);
      PyshellContainer.setupReadHandlers();

      PyshellContainer.process.on('exit', (code) => {
        console.log("here too soon");
      });

    };

    static setupReadHandlers() {
      PyshellContainer.process.stdout.on('data', (message) => {
        console.log("HANDLING");
        RequestHandler.handle(message);
      });
    };

    static write(message) {
      console.log("WRITING MESSAGE:" + message);
      PyshellContainer.process.stdin.write(message + '\n');
    };
}

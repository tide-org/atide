'use babel';

import { PythonShell } from './python-shell';
import Dictionary from './dictionary';
import Startup from './startup';
import Request from './request';

export default class PyshellContainer {

    static pyshell = null;

    static tideScript = 'start-tide.py';

    static options = {
      mode: 'text',
      //pythonOptions: ['-u'],
      scriptPath: atom.packages.getPackageDirPaths() + '/atide/lib/python',
      args: []
    };

    static init() {
        process.env['TIDE_CONFIG_LOCATION'] = '/Users/willvk/Source/wilvk/tide-plugins/plugins/atom/test_c/';
        PyshellContainer.pyshell = PythonShell.run(PyshellContainer.tideScript, PyshellContainer.options);

        PyshellContainer.pyshell.on('message', (message) => {
          let request = new Request(message);
          if (request.isValidRequest(message)) {
            let action = request.getAction();
            let requestValue = request.getValue();
            if(action == 'set_full_config_dictionary') {
              console.log("SET_FULL_CONFIG_DICTIONARY: %j", requestValue);
              Dictionary.set(request.getValue());
            }
            if(action == 'set_config_dictionary_item') {
              console.log("SET_CONFIG_DICTIONARY_ITEM: %j", requestValue);
              Dictionary.add(requestValue);
            }
            Startup.run();
          }
        });

        //PyshellContainer.pyshell.end( (err, code, signal) => {
        //  if (err) throw err;
        //  console.log("here too soon");
        //});

    };
}

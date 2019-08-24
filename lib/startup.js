'use babel';

import Dictionary from './dictionary';
import PyshellContainer from './pyshell-container';

export default class Startup {

    static commandObject = {
              "command": {
                "action": "run_config_command",
                "value": null
              },
              "sender": "editor",
              "receiver": "tide"
            };
    static hasRunStartup = false;

    static run() {
      if (!Startup.hasRunStartup) {
        Startup.hasRunStartup = true;
        let events = Dictionary.getEvents(); 
        let startupEvents = events["after_startup"];
        if (Array.isArray(startupEvents)) {
          startupEvents.forEach((configCommandString) => {
            let command = Object.assign({}, Startup.commandObject);
            command['command']['value'] = configCommandString;
            console.log("RUNNING COMMAND: " + configCommandString);
            PyshellContainer.pyshell.send(JSON.stringify(command));
          });
        }
      };
    }
}

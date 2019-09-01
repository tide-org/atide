'use babel';

import Dictionary from './dictionary';
import PyshellContainer from './pyshell-container';
import UUIDv4 from './uuidv4'

export default class Startup {

    static commandObject = {
              "command": {
                "action": "run_config_command",
                "value": null
              },
              "sender": "editor",
              "receiver": "tide",
              "has_callback" : true,
              "event_id": null
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
            command['event_id'] = UUIDv4.get();
            PyshellContainer.write(JSON.stringify(command));
          });
        }
      };
    }
}

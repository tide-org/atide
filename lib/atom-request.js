'use babel';

import PyshellContainer from './pyshell-container';
import Dictionary from './dictionary';
import UUIDv4 from './uuidv4';

export default class AtomRequest {

    static requestsSent = {};

    static hasSentRunStartup = false;
    
    static startupConfigCommands = [];

    static requestObject = {
              "command": {
                "action": null,
                "value": null
              },
              "sender": "editor",
              "receiver": "tide",
              "has_callback" : true,
              "event_id": null
            };

    static cloneRequestObject() {
      return Object.assign({}, AtomRequest.requestObject);
    }

    static write(request) {
      console.log("WRITING MESSAGE:: %j", request);
      PyshellContainer.write(JSON.stringify(request));
    }

    static sendRunConfigCommand(command, buffer_name='', event_input_args='') {
      let request = AtomRequest.cloneRequestObject();
      let eventId = UUIDv4.get();
      request["command"]['action'] = 'run_config_command';
      request["command"]['value'] = { 
        'command': command,
        'buffer_name': buffer_name,
        'event_input_args': event_input_args
      };
      request["event_id"] = eventId;
      AtomRequest.requestsSent[eventId] = request;
      AtomRequest.write(request);
    }

    static runStartupEvents() {
      if (!AtomRequest.hasSentRunStartup) {
        if (AtomRequest.startupConfigCommands.length == 0) {
          AtomRequest.startupConfigCommands = Dictionary.getEvents().after_startup || [];
        }
        let configCommandString = AtomRequest.startupConfigCommands.shift();
        if (configCommandString || false) {
          AtomRequest.sendRunConfigCommand(configCommandString);
        } else {
          AtomRequest.hasSentRunStartup = true;
        }
      };
    }
}

'use babel';

import PyshellContainer from './pyshell-container';

export default class Response {

    static responseObject = {
              "command": {
                "action": null, "value": null
              },
              "sender": "editor", "receiver": "tide", "has_callback" : false, "event_id": null
            };

    static cloneResponseObject() {
      return Object.assign({}, Response.responseObject);
    }

    static write(response) {
      PyshellContainer.write(JSON.stringify(response));
    }

    static sendAck(command_action, event_id, value='') {
      response = Response.cloneResponseObject();
      response.command.action = command_action;
      response.command.value = value;
      response.event_id = event_id;
      Response.write(response);
    }

}

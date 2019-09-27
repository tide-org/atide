'use babel';

import TideRequest from './tide-request';
import AtomRequest from './atom-request';
import Dictionary from './dictionary';
import Response from './response';
import WorkspaceHandler from './workspace-handler';

export default class TideRequestHandler {

    static handle(fullMessage) {
      var utf8FullMessage = fullMessage.toString('utf8');
      var splitMessage = utf8FullMessage.split(/\r?\n/);
      splitMessage.forEach((message) => {
        let request = new TideRequest(message);
        if (request.isValidRequest(message)) {
          TideRequestHandler.handleSingleRequest(request);
        };
      });
      WorkspaceHandler.updateEditors();
    };

    static handleSingleRequest(request) {
        let action = request.getAction();
        let requestValue = request.getValue();
        let eventId = request.getEventId();
        let hasCallback = request.hasCallback();

        if(action == 'set_full_config_dictionary') {
          Dictionary.set(request.getValue());
        }

        if(action == 'set_config_dictionary_item') {
          Dictionary.add(requestValue);
        }

        if(action == 'send_message_to_editor') {
          if (requestValue.startup_complete || false) {
            AtomRequest.hasSentRunStartup = true;
          }
        }

        if(action == "editor_function") {
          console.log("EDITOR FUNCTION: " + requestValue);
        }

        if(action == 'run_config_command') {
          if (!AtomRequest.hasSentRunStartup) {
            AtomRequest.runStartupEvents();
          }
        }

        if (hasCallback) {
          Response.sendAck(action, eventId);
        }
    }
}

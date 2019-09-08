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
        console.log("RECEIVED MESSAGE:" + message);
        let request = new TideRequest(message);
        if (request.isValidRequest(message)) {
          TideRequestHandler.handleSingleRequest(request);
        };
      });
      WorkspaceHandler.updateTextEditors();
    };

    static handleSingleRequest(request) {
        let action = request.getAction();
        let requestValue = request.getValue();
        let eventId = request.getEventId();
        let hasCallback = request.hasCallback();

        if(action == 'set_full_config_dictionary') {
          console.log("SET_FULL_CONFIG_DICTIONARY: %j", requestValue);
          Dictionary.set(request.getValue());
          WorkspaceHandler.initialiseEditors();
        }

        if(action == 'set_config_dictionary_item') {
          console.log("SET_CONFIG_DICTIONARY_ITEM: %j", requestValue);
          Dictionary.add(requestValue);
        }

        if(action == 'send_message_to_editor') {
          if (requestValue.startup_complete || false) {
            console.log("TIDE STARTUP COMPLETE");
            AtomRequest.runStartupEvents();
          }
        }

        if(action == "editor_function") {
          // TODO: implement
        }

        if(action == 'run_config_command') {
          console.log("CHECKING TO RUN ANOTHER CC");
          AtomRequest.runStartupEvents();
        }

        if (hasCallback) {
          Response.sendAck(action, eventId);
        }
        WorkspaceHandler.updateTextEditors();
    }
}

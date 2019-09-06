'use babel';

import Request from './request';
import Startup from './startup';
import Dictionary from './dictionary';
import Response from './response';
import WorkspaceHandler from './workspace-handler';

export default class RequestHandler {

    static handle(fullMessage) {
      var utf8FullMessage = fullMessage.toString('utf8');
      var splitMessage = utf8FullMessage.split(/\r?\n/);
      splitMessage.forEach((message) => {
        let request = new Request(message);
        if (request.isValidRequest(message)) {
          RequestHandler.handleSingleRequest(request);
        };
      });
      WorkspaceHandler.updateTextEditors();
    };

    static handleSingleRequest(request) {
        let action = request.getAction();
        let requestValue = request.getValue();
        let eventId = request.getEventId();

        if(action == 'set_full_config_dictionary') {
          console.log("SET_FULL_CONFIG_DICTIONARY: %j", requestValue);
          Dictionary.set(request.getValue());
          Response.sendAck(action, eventId);
          WorkspaceHandler.initialiseEditors();
        }

        if(action == 'set_config_dictionary_item') {
          console.log("SET_CONFIG_DICTIONARY_ITEM: %j", requestValue);
          Dictionary.add(requestValue);
          Response.sendAck(action, eventId);
        }
        if(action == 'send_message_to_editor') {
          if (requestValue.startup_complete || false) {
            console.log("TIDE STARTUP COMPLETE");
            Startup.run();
            Response.sendAck(action, eventId);
          }
        }
    }
}

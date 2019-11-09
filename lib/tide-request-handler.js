'use babel';

import TideRequest from './tide-request';
import AtomRequest from './atom-request';
import Dictionary from './dictionary';
import Response from './response';
import WorkspaceHandler from './workspace-handler';
import EditorFunction from './editor-function';
import Config from './config';
import Log from './log';

export default class TideRequestHandler {

    static handle(fullMessage) {
      let messageArray = TideRequestHandler.getMessageArray(fullMessage);
      TideRequestHandler.iterateMessages(messageArray);
    };

    static getMessageArray(fullMessage) {
      var utf8FullMessage = fullMessage.toString('utf8');
      return utf8FullMessage.split(/\r?\n/);
    }

    static iterateMessages(splitMessage) {
      splitMessage.forEach((message) => {
        let request = new TideRequest(message);
        if (request.isValidRequest(message)) {
          TideRequestHandler.handleSingleRequest(request);
        };
      });
    }

    static requestLookup = {
        'set_full_config_dictionary': (requestValue) => {
          Dictionary.set(requestValue);
          WorkspaceHandler.updateEditors();
        },

        'set_config_dictionary_item': (requestValue) => {
          Dictionary.add(requestValue);
          WorkspaceHandler.updateEditors();
        },

        'send_message_to_editor': (requestValue) => {
          if (requestValue.startup_complete || false) {
            AtomRequest.hasSentRunStartup = true;
          }
        },

        'editor_function': (requestValue) => {
          Log.toCon(Config.displayMiscellaneousMessages, "EDITOR FUNCTION: ", JSON.stringify(requestValue));
          EditorFunction.callEditorFunction(requestValue);
        },

        'get_current_buffer_name': (requestValue) => {
          return WorkspaceHandler.getCurrentBufferName();
        }
    };


    static handleSingleRequest(request) {
        let action = request.getAction();
        let requestValue = request.getValue();
        let eventId = request.getEventId();
        let hasCallback = request.hasCallback();
        let value = '';

        let requestFunction = TideRequestHandler.requestLookup[action];
        if (requestFunction) {
          value = requestFunction(requestValue);
        }

        if (hasCallback) {
          Response.sendAck(action, eventId, value);
        }
    }
}

'use babel';

import Request from './request';
import Startup from './startup';
import Dictionary from './dictionary';
import Response from './response';

export default class RequestHandler {

    static handle(fullMessage) {
      var utf8FullMessage = fullMessage.toString('utf8');
      var splitMessage = utf8FullMessage.split(/\r?\n/);
      console.log("MESSAGE:" + splitMessage.toString())
      splitMessage.forEach((message) => {
        let request = new Request(message);
        if (request.isValidRequest(message)) {
          RequestHandler.handleSingleRequest(request);
          Startup.run();
        };
      });
    };

    static handleSingleRequest(request) {
        let action = request.getAction();
        let requestValue = request.getValue();
        console.log("JSONSTRING: " + request.jsonString);
        let eventId = request.getEventId();
        console.log("EVENTID: " + eventId);
        if(action == 'set_full_config_dictionary') {
          console.log("SET_FULL_CONFIG_DICTIONARY: %j", requestValue);
          Dictionary.set(request.getValue());
          Response.sendAck(action, eventId);
        }
        if(action == 'set_config_dictionary_item') {
          console.log("SET_CONFIG_DICTIONARY_ITEM: %j", requestValue);
          Dictionary.add(requestValue);
          Response.sendAck(action, eventId);
        }
    }

}

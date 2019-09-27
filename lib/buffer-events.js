'use babel';

import Dictionary from './dictionary';
import AtomRequest from './atom-request';

export default class BufferEvents {

  static runBufferCommand(bufferName) {
    let bufferConfig = Dictionary.dictionary.buffers[bufferName];
    let command = bufferConfig.command||false;
    if(command) {
      console.log("SENDING COMMAND: " + command + " FOR BUFFER: " + bufferName);
      AtomRequest.sendRunConfigCommand(command, bufferName);
    }
  }

  static runConfigEvents(bufferName, event_name) {
    let eventCommands = Dictionary.dictionary.buffers[bufferName] &&
       Dictionary.dictionary.buffers[bufferName].events &&
       Dictionary.dictionary.buffers[bufferName].events[event_name];
    if (eventCommands || false) {
      eventCommands.forEach((item, index) => {
        let eventCommandName = item.command;
        let args = item.input_args || '';
        console.log("TO RUN: %s WITH ARGS:: %j", eventCommandName, args);
        AtomRequest.sendRunConfigCommand(eventCommandName, bufferName, args);
      });
    }
  }
}

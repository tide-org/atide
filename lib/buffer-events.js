'use babel';

import Dictionary from './dictionary';

export default class BufferEvents {

  static runBufferCommand(bufferName) {

  }

  static runConfigEvents(bufferName, event_name) {
    let eventCommands = Dictionary.dictionary.buffers[bufferName] &&
       Dictionary.dictionary.buffers[bufferName].events &&
       Dictionary.dictionary.buffers[bufferName].events[event_name];
    if (eventCommands || false) {
      eventCommands.forEach((item, index) => {
        let eventCommandName = item.command;
        console.log("TO RUN: " + eventCommandName + " for item: " + item);
      });
    }
  }
}

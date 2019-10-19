'use babel';

import Dictionary from '../dictionary';

export default class buffer_piets {

  static set_piets(value) {
    console.log("BUFFER_PIETS::SET_PIETS");
    console.log("VALUE: %j", JSON.stringify(value));

    let pietMatchList = Dictionary.dictionary.variables;
    let bufferName = value.buffer_name;
    let eventArgs = value.event_input_args;
    if (eventArgs) {
      console.log("here1");
      let pietMatchArrayVariable = eventArgs.piet_match_array_variable;
      let currentFilenameVariable = eventArgs.current_filename_variable;
      if (pietMatchArrayVariable != '') {
        console.log("here2");
        // get TextEditor
        let pietMatchList = Dictionary.dictionary.variables[pietMatchArrayVariable];
        if (typeof pietMatchList !== 'undefined' && pietMatchList.length > 0) {
          console.log("here3");
          for(pietMatch in pietMatchList) {
            let lineCounter = 1;
            let bufferCache = Dictionary.dictionary.internal.buffer_caches[bufferName];
            for (line in bufferCache) {
              if (line == pietMatch) {
                // set piet
              }
              lineCounter++;
            }
          }
        }
      }
    }
  }
}

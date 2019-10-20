'use babel';

import Dictionary from '../dictionary';

export default class buffer_piets {

  static getPietIndex(pietMatch, currentFileName) {
    let fileName = pietMatch.split(":", 1)[0];
    let lineNumber = pietMatch.split(":", 2)[1]
    let lineIndex = lineNumber - 1;
    let fileMatch = currentFileName.indexOf(fileName) >= 0;
    if (fileMatch && lineIndex !== 'undefined') {
      return lineIndex;
    }
    return -1;
  }

  static setPietOn(index, fileName) {
    console.log("HELLO ", index, " ", fileName);
    let textEditors = atom.workspace.getTextEditors();
    for (textEditor of textEditors) {
      console.log("HERE");
      let editorPath = textEditor.getPath();
      if (editorPath == fileName) {
        console.log("editorPath", editorPath);
        let element = textEditor.getElement();
        let lines = element.getElementsByClassName('line-number');
        for (line of lines) {
          let dataRow = line.getAttribute('data-buffer-row')
          if (dataRow == index) {
            line.style.background = "#ff0000";
          }
        }
      }
    }
  };

  static set_piets(value) {
    console.log("BUFFER_PIETS::SET_PIETS");
    let pietMatchList = Dictionary.dictionary.variables.file_lines;
    let eventArgs = value.event_input_args;
    console.log("VARS: %j", Dictionary.dictionary.variables);
    if (eventArgs) {
      console.log("eventArgs");
      let pietMatchArrayVariable = eventArgs.piet_match_array_variable;
      let currentFilenameVariable = eventArgs.current_filename_variable;
      if (pietMatchArrayVariable != '') {
        console.log("pietMatchArrayVariable");
        let pietMatchList = Dictionary.dictionary.variables[pietMatchArrayVariable];
        let currentFileName = Dictionary.dictionary.variables[currentFilenameVariable];
        console.log("PML: ", pietMatchList);
        if (typeof pietMatchList !== 'undefined' && pietMatchList.length > 0) {
          console.log("pietMatchList");
          for(pietMatch of pietMatchList) {
            console.log("pietMatch");
            pietIndex = buffer_piets.getPietIndex(pietMatch, currentFileName)
            if (pietIndex >= 0) {
              console.log("pietIndex");
              buffer_piets.setPietOn(pietIndex, currentFileName);
            }
          }
        }
      }
    }
  }
}

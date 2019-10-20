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
  };

  static setPietOn(index, fileName) {
    let textEditors = atom.workspace.getTextEditors();
    for (textEditor of textEditors) {
      let editorPath = textEditor.getPath();
      if (editorPath == fileName) {
        buffer_piets.setGutterByIndex(textEditor, index);
      }
    }
  };

  static setGutterByIndex(textEditor, index) {
    let element = textEditor.getElement();
    let lines = element.getElementsByClassName('line-number');
    for (line of lines) {
      let dataRow = line.getAttribute('data-buffer-row')
      if (dataRow == index) {
        line.style.background = "#ff0000";
      } else {
        line.style.background = undefined;
      }
    }
  };

  static setPietsFromMatchList(pietMatchList, currentFileName) {
    if (typeof pietMatchList !== 'undefined' && pietMatchList.length > 0) {
      for(pietMatch of pietMatchList) {
        pietIndex = buffer_piets.getPietIndex(pietMatch, currentFileName)
        if (pietIndex >= 0) {
          buffer_piets.setPietOn(pietIndex, currentFileName);
        }
      }
    }
  };

  static set_piets(value) {
    let eventArgs = value.event_input_args;
    if (eventArgs) {
      if (eventArgs.piet_match_array_variable != '') {
        buffer_piets.setPietsFromMatchList(Dictionary.dictionary.variables[eventArgs.piet_match_array_variable], Dictionary.dictionary.variables[eventArgs.current_filename_variable]);
      }
    }
  };
}

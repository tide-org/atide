'use babel';

import Dictionary from '../dictionary';

export default class buffer_piets {

  static getPietIndex(pietMatch, currentFileName) {
    let fileName = pietMatch.split(":", 1)[0];
    let lineIndex = (pietMatch.split(":", 2)[1]) - 1;
    if (currentFileName.indexOf(fileName) >= 0 && lineIndex !== null) {
      return lineIndex;
    }

    return -1;
  };

  static getEditorByFileName(fileName) {
    let textEditors = atom.workspace.getTextEditors();
    for (textEditor of textEditors) {
      let editorPath = textEditor.getPath();
      var editorPathBase = editorPath.replace(/^.*[\\\/]/, '')
      var fileNameBase = fileName.replace(/^.*[\\\/]/, '')
      if (editorPath == fileName || editorPathBase == fileNameBase) {
        return textEditor;
      }
    }
  }

  static setPietOn(index, fileName) {
    let textEditor = buffer_piets.getEditorByFileName(fileName);
    if (textEditor != null) {
      buffer_piets.setGutterByIndex(textEditor, index);
    }
  };

  static setPietOnString(stringToMatch, fileName) {
    let textEditor = buffer_piets.getEditorByFileName(fileName);
    if (textEditor != null) {
      let index = buffer_piets.getIndexByString(textEditor, stringToMatch);
      buffer_piets.setGutterByIndex(textEditor, index)
    }
  };

  static setGutterByIndex(textEditor, index) {
    let lines = buffer_piets.getLinesFromTextEditor(textEditor);
    for (line of lines) {
      let dataRow = line.getAttribute('data-buffer-row');
      if (dataRow == index) {
        line.style.background = "#ff0000";
      }
    }
  };

  static getIndexByString(textEditor, stringToMatch) {
    let element = textEditor.getElement();
    let lines = element.getElementsByClassName('line');
    let count = 0;
    for (line of lines) {
      if (line.textContent.includes(stringToMatch)) {
        return count;
      }
      count += 1;
    }
    return -1;
  }

  static getLinesFromTextEditor(textEditor) {
    let element = textEditor.getElement();
    return element.getElementsByClassName('line-number');
  }

  static clearPiets(fileName) {
    let textEditor = buffer_piets.getEditorByFileName(fileName);
    if (textEditor != null) {
      let lines = buffer_piets.getLinesFromTextEditor(textEditor);
      for (line of lines) {
        line.style.background = '';
      }
    }
  }

  static setPietsFromMatchList(pietMatchList, currentFileName) {
    buffer_piets.clearPiets(currentFileName);
    if (pietMatchList !== null && pietMatchList.length > 0) {
      for(pietMatch of pietMatchList) {
        pietIndex = buffer_piets.getPietIndex(pietMatch, currentFileName)
        if (pietIndex >= 0) {
          buffer_piets.setPietOn(pietIndex, currentFileName);
        } else {
          buffer_piets.setPietOnString(pietMatch, currentFileName);
        }
      }
    }
  };

  static set_piets(value) {
    let eventArgs = value.event_input_args;
    if (eventArgs) {
      if (eventArgs.piet_match_array_variable != '') {
        matchArray = Dictionary.dictionary.variables[eventArgs.piet_match_array_variable];
        filename = eventArgs.current_filename_variable;
        if (matchArray && filename) {
          buffer_piets.setPietsFromMatchList(matchArray, filename);
        }
      }
    }
  };
}

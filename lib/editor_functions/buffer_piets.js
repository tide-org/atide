'use babel';

import Dictionary from '../dictionary';
import Config from '../config';
import Log from '../log';

export default class buffer_piets {

  static getPietIndex(pietMatch, currentFileName) {
    let fileName = pietMatch.split(":", 1)[0];
    let lineIndex = (pietMatch.split(":", 2)[1]) - 1;
    if (currentFileName.indexOf(fileName) >= 0 && lineIndex !== null) {
      Log.toCon(Config.displayEditorFunctionMessages, "Piet Index:" + lineIndex);
      return lineIndex;
    }
    return -1;
  };

  static getEditorByFileName(fileName) {
    let textEditors = atom.workspace.getTextEditors();
    for (textEditor of textEditors) {
      let editorPath = textEditor.getPath();
      Log.toCon(Config.displayEditorFunctionMessages, "File Name:" + fileName);
      Log.toCon(Config.displayEditorFunctionMessages, "Editor Path:" + editorPath);
      if (editorPath == fileName) {
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

  static setGutterByIndex(textEditor, index) {
    let lines = buffer_piets.getLinesFromTextEditor(textEditor);
    for (line of lines) {
      let dataRow = line.getAttribute('data-buffer-row');
      if (dataRow == index) {
        line.style.background = "#ff0000";
      }
    }
  };

  static getLinesFromTextEditor(textEditor) {
    let element = textEditor.getElement();
    return element.getElementsByClassName('line-number');
  }

  static clearPiets(fileName) {
    let textEditor = buffer_piets.getEditorByFileName(fileName);
    Log.toCon(Config.displayEditorFunctionMessages, "Clear File Name:" + fileName);
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
        }
      }
    }
  };

  static set_piets(value) {
    let eventArgs = value.event_input_args;
    if (eventArgs) {
      if (eventArgs.piet_match_array_variable != '') {
        matchArray = Dictionary.dictionary.variables[eventArgs.piet_match_array_variable];
        filename = Dictionary.dictionary.variables[eventArgs.current_filename_variable];
        if (match_array && filename) {
          buffer_piets.setPietsFromMatchList(matchArray, filename);
        }
      }
    }
  };
}

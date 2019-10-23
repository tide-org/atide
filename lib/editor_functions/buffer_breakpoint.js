'use babel';

import Dictionary from '../dictionary';

export default class buffer_breakpoint {

  static set_highlight_line(value) {
    console.log("BUFFER_BREAKPOINT::SET_HIGHLIGHT_LINE");
    let eventArgs = value.event_input_args;
    let highlightLineVariable = eventArgs.highlight_line_variable;
    let currentFilenameVariable = eventArgs.current_filename_variable;
    let highlightLine = Dictionary.dictionary.variables[highlightLineVariable];
    if (highlightLineVariable != '' && highlightLine !== undefined) {
      if (highlightLine > 0) {
        let fileName = Dictionary.dictionary.variables[currentFilenameVariable];
        let index = highlightLine - 1;
        buffer_breakpoint.setHighlightLine(fileName, index);
      }
    }
  }

  static setHighlightLine(fileName, index) {
    let textEditors = atom.workspace.getTextEditors();
    for (textEditor of textEditors) {
      let editorPath = textEditor.getPath();
      if (editorPath == fileName) {
        buffer_breakpoint.setHighlightByIndex(textEditor, index);
      }
    }
  }

  static setHighlightByIndex(textEditor, index) {
    let element = textEditor.getElement();
    let lines = element.getElementsByClassName('line');
    for (line of lines) {
      line.style.background = '';
    }
    for (line of lines) {
      let dataRow = line.getAttribute('data-screen-row')
      if (dataRow == index) {
        line.style.background = "#ff0000";
      }
    }
  }
}

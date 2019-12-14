'use babel';

import Dictionary from '../dictionary';

export default class buffer_breakpoint {

  static set_highlight_line(value) {
    let eventArgs = value.event_input_args;
    let highlightLineVariable = eventArgs.highlight_line_variable;
    let currentFilenameVariable = eventArgs.current_filename_variable;
    let matchLineOnString = (eventArgs.match_line_on_string.toLowerCase() == 'true');
    let matchBufferOnFilename = (eventArgs.match_buffer_on_filename.toLowerCase() == 'true');
    buffer_breakpoint.setHighlightLine(currentFilenameVariable, highlightLineVariable, matchLineOnString, matchBufferOnFilename);
  }

  static setHighlightLine(currentFilenameVariable, highlightLineVariable, matchLineOnString, matchBufferOnFilename) {
    let fileName = Dictionary.dictionary.variables[currentFilenameVariable];
    let textEditors = atom.workspace.getTextEditors();
    let highlightLine = Dictionary.dictionary.variables[highlightLineVariable];
    let textEditorForHighlight = null;

    for (textEditor of textEditors) {
      let editorPath = textEditor.getPath();
      let editorFilename = textEditor.getFileName();
      if ( ( !matchBufferOnFilename && editorPath == fileName ) || ( currentFilenameVariable == editorFilename ) ) {
        textEditorForHighlight = textEditor;
        break;
      }
    }
    
    if (textEditorForHighlight !== null) {
      buffer_breakpoint.clearExistingHighlights(textEditor);
      if (!matchLineOnString) {
        let index = highlightLine - 1;
        buffer_breakpoint.setHighlightByIndex(textEditor, index);
      } else {
        buffer_breakpoint.setHighlightByStringMatch(textEditor, highlightLine);
      }
    }
  }


  static setHighlightByStringMatch(textEditor, stringToMatch) {
    let element = textEditor.getElement();
    let lines = element.getElementsByClassName('line');
    for (line of lines) {
      if (line.textContent.includes(stringToMatch)) {
        line.style.background = "#ff0000";
        break; 
      }
    }
  }

  static clearExistingHighlights(textEditor) {
    let element = textEditor.getElement();
    let lines = element.getElementsByClassName('line');
    for (line of lines) {
      line.style.background = '';
    }
  }

  static setHighlightByIndex(textEditor, index) {
    let element = textEditor.getElement();
    let lines = element.getElementsByClassName('line');
    for (line of lines) {
      let dataRow = line.getAttribute('data-screen-row')
      if (dataRow == index) {
        line.style.background = "#ff0000";
      }
    }
  }
}

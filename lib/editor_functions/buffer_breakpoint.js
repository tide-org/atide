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
      let dataRow = line.getAttribute('data-screen-row')
      if (dataRow == index) {
        line.style.background = "#ff0000";
      } else {
        line.style.background = undefined;
      }
    }
  }


}

//{"function_file":"buffer_breakpoint","function_name":"set_highlight_line","function_args":{"function_args":null,"event_input_args":{"highlight_line_variable":"current_line_number","current_filename_variable":"current_buffer_name"},"buffer_name":""}}

//function! buffer_breakpoint#set_highlight_line(...)
//   let l:args = get(a:, 1, {})
//   let l:event_args = l:args["event_input_args"]
//   let l:highlight_line_variable = l:event_args["highlight_line_variable"]
//   let l:buffer_name = @%
//   if l:highlight_line_variable != '' && g:vg_config_dictionary['variables'][l:highlight_line_variable] != ''
//       let l:line_number = g:vg_config_dictionary['variables'][l:highlight_line_variable]
//       if l:line_number > 0
//           execute "sign unplace 2"
//           execute "sign place 2 line=" . l:line_number . " name=wholeline_breakpoint file=" . expand("%:p")
//           return
//       endif
//   endif
//   execute "sign unplace 2"
//endfunction

'use babel';

import Dictionary from '../dictionary';

export default class buffer_diff {

  static current_filename = '';

  static check_do_buffer_diff(value) {

    let eventArgs = value.event_input_args;
    if (eventArgs) {
      let cacheVariable = eventArgs.buffer_cache_variable;
      let bufferName = eventArgs.buffer_name
      let currentBuffer = Dictionary.dictionary.internal.buffer_caches[bufferName];
      let cacheBuffer = (Dictionary.getVariables()||{})[cacheVariable]||[];
      let editor = buffer_diff.getTextEditor(bufferName);
      buffer_diff.clearExistingHighlights(editor);
      if (cacheBuffer.length > 0) {
        if (cacheBuffer.length > 0 && currentBuffer.length <= cacheBuffer.length) {
          let lineIndex = 0;
          for (let [index, line] of currentBuffer.entries()) {
            if (line.localeCompare(cacheBuffer[index]) != 0 ) {
              buffer_diff.setHighlightByIndex(editor, index);
            }
          }
        }
      }
      (Dictionary.getVariables()||{})[cacheVariable] = Dictionary.dictionary.internal.buffer_caches[bufferName];
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

  static getTextEditor(bufferName) {
    let textEditors = atom.workspace.getTextEditors();
    for (textEditor of textEditors) {
      let editorFilename = textEditor.getFileName();
      if (bufferName == editorFilename) {
        return textEditor;
      }
    }
  }
}

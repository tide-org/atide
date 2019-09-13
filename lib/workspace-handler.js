'use babel';

import Dictionary from './dictionary';
import TextEditor from './texteditor';
import BufferEvents from './buffer-events';

export default class WorkspaceHandler {

  static textEditors = {};

  static initialiseEditors() {
    WorkspaceHandler.openStartupBuffers();
  }

  static openStartupBuffers() {

    let buffers = Dictionary.dictionary["buffers"];

    Object.keys(buffers).forEach((key, index) => {
      let textEditor = new TextEditor(buffers, key);
      let openOptions = {};

      if (textEditor.onStartup) {
        if (textEditor.isPrimaryWindow) {
          openOptions["split"] = 'left';
        } else {
          openOptions["split"] = 'right';
        }

        BufferEvents.runConfigEvents(key, 'before_command');

        atom.workspace.open(key, openOptions).then( (editorValue) => { 
          WorkspaceHandler.textEditors[key] = { 'atom': editorValue, 'tide': textEditor };
          BufferEvents.runBufferCommand(key);
          // TODO: use promise here
          BufferEvents.runConfigEvents(key, 'after_command');
        });
      }
    });
  }

  static updateTextEditors() {
    let buffers = Dictionary.dictionary["buffers"];
    let internal = Dictionary.dictionary["internal"];
    let bufferCaches = {};
    if (internal !== undefined) {
      bufferCaches = internal["buffer_caches"];
    };

    if (Object.keys(bufferCaches).length > 0) {
      Object.keys(bufferCaches).forEach((bufferCacheKey, bufferCacheIndex) => {
        Object.keys(buffers).forEach((bufferKey, bufferIndex) => {
          if (bufferCacheKey == bufferKey) {
            let atomEditor = WorkspaceHandler.textEditors[bufferCacheKey].atom||'';
            if (atomEditor != '') {
              atomEditor.setText('');
              let bufferText = '';
              let bufferCache = bufferCaches[bufferCacheKey];
              bufferCache.forEach((item, index) => {
                bufferText += item + '\n';
              });
              atomEditor.setText(bufferText);
            }
          };
        })
      });
    }
  }
}

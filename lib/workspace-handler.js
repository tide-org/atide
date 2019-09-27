'use babel';

import Dictionary from './dictionary';
import TextEditor from './texteditor';
import BufferEvents from './buffer-events';

export default class WorkspaceHandler {

  static textEditors = {};

  static startupBuffersOpened = false;

  static initialiseEditors() {
    let buffers = Dictionary.dictionary["buffers"];
    Object.keys(buffers).forEach((bufferName, index) => {
      WorkspaceHandler.startupBuffersOpened = true;
      let textEditor = new TextEditor(buffers, bufferName);
      let openOptions = {};

      if (textEditor.onStartup) {
        if (textEditor.isPrimaryWindow) {
          openOptions["split"] = 'left';
        } else {
          openOptions["split"] = 'right';
        }
        atom.workspace.open(bufferName, openOptions).then( (editorValue) => { 
          WorkspaceHandler.textEditors[bufferName] = {
            'atom': editorValue,
            'tide': textEditor
          };
        });
      }
    });
  }

  static updateEditors() {
    if(!WorkspaceHandler.startupBuffersOpened) {
      WorkspaceHandler.initialiseEditors();
      return;
    };

    let buffers = Dictionary.dictionary["buffers"];
    let internal = Dictionary.dictionary["internal"];
    let bufferCaches = {};
    if (internal !== undefined) {
      bufferCaches = internal["buffer_caches"];
    };

    console.log("HEREEE_1: %j", Object.keys(bufferCaches) );
    console.log("HEREEE_2: %j", Object.keys(WorkspaceHandler.textEditors) );
    if (Object.keys(bufferCaches).length > 0 && Object.keys(WorkspaceHandler.textEditors).length > 0) {
      Object.keys(bufferCaches).forEach((bufferCacheName, bufferCacheIndex) => {
        Object.keys(buffers).forEach((bufferName, bufferIndex) => {
          if (bufferCacheName == bufferName) {
            let atomEditor = WorkspaceHandler.textEditors[bufferCacheName].atom||'';
            if (atomEditor != '') {
              atomEditor.setText('');
              let bufferText = '';
              let bufferCache = bufferCaches[bufferCacheName];
              bufferCache.forEach((bufferCacheLine, index) => {
                bufferText += bufferCacheLine + '\n';
              });
              atomEditor.setText(bufferText);
            }
          };
        })
      });
    }
  }
}

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

  static removeExistingPanes() {
    panes = atom.workspace.getPanes();
    for(pane of panes) {
      pane.destroy();
    }
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

    if (Object.keys(bufferCaches).length > 0 && Object.keys(WorkspaceHandler.textEditors).length > 0) {
      Object.keys(bufferCaches).forEach((bufferCacheName, bufferCacheIndex) => {
        Object.keys(buffers).forEach((bufferName, bufferIndex) => {
          if (bufferCacheName == bufferName) {
            let textEditor = WorkspaceHandler.textEditors[bufferCacheName]||'';
            if (textEditor != '') {
              let atomEditor = textEditor.atom||'';
              if (atomEditor != '') {
                let bufferText = '';
                let bufferCache = bufferCaches[bufferCacheName]||'';
                if(bufferCache != '') {
                  let bufferText = '';
                  if (Array.isArray(bufferCache)) {
                    bufferCache.forEach((bufferCacheLine, index) => {
                      bufferText += bufferCacheLine + '\n';
                    });
                    atomEditor.setText(bufferText);
                  } else {
                    // nothing should be here
                  }
                }
              }
            };
          };
        })
      });
    }
  }
}

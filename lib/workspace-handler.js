'use babel';

import Dictionary from './dictionary';
import TextEditor from './texteditor';

export default class WorkspaceHandler {

  static textEditors = {};

  static startupBuffersOpened = false;

  static initialiseEditors() {
    let buffers = Dictionary.dictionary.buffers;
    Object.keys(buffers).forEach((bufferName, index) => {
      WorkspaceHandler.startupBuffersOpened = true;
      let textEditor = new TextEditor(buffers, bufferName);

      if (textEditor.onStartup) {
        let openOptions = WorkspaceHandler.setOpenOptions(textEditor);
        WorkspaceHandler.openEditorWithOptions(bufferName, openOptions);
      }
    });
  }

  static setOpenOptions(textEditor) {
    let openOptions = {};
    if (textEditor.isPrimaryWindow) {
      openOptions.split = 'left';
    } else {
      openOptions.split = 'right';
    }
    return openOptions;
  }

  static openEditorWithOptions(bufferName, openOptions) {
    atom.workspace.open(bufferName, openOptions).then((editorValue) => {
      WorkspaceHandler.textEditors[bufferName] = {'atom': editorValue, 'tide': textEditor};
    });
  }

  static removeExistingPanes() {
    panes = atom.workspace.getPanes();
    for(pane of panes) {
      pane.destroy();
    }
  }

  static getCurrentBufferName() {
    return atom.workspace.getActiveTextEditor().buffer.file.path;
  }

  static setEditorText(bufferCache, atomEditor) {
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

  static iterateBufferCaches(bufferCaches, buffers) {
    if (Object.keys(bufferCaches).length > 0 && Object.keys(WorkspaceHandler.textEditors).length > 0) {
      Object.keys(bufferCaches).forEach((bufferCacheName, bufferCacheIndex) => {
        Object.keys(buffers).forEach((bufferName, bufferIndex) => {
          if (bufferCacheName == bufferName) {
            let textEditor = WorkspaceHandler.textEditors[bufferCacheName]||'';
            if (textEditor != '') {
              let atomEditor = textEditor.atom||'';
              if (atomEditor != '') {
                let bufferCache = bufferCaches[bufferCacheName]||'';
                WorkspaceHandler.setEditorText(bufferCache, atomEditor);
              }
            };
          };
        })
      });
    }
  }

  static getBufferCaches() {
    let internal = Dictionary.dictionary.internal;
    let bufferCaches = {};
    if (internal !== null) {
      bufferCaches = internal["buffer_caches"];
    };
    return bufferCaches;
  }

  static checkInitialiseEditors() {
    if(!WorkspaceHandler.startupBuffersOpened) {
      WorkspaceHandler.initialiseEditors();
      return true
    };
    return false;
  }

  static updateEditors() {
    if (WorkspaceHandler.checkInitialiseEditors()) {
      return;
    }

    let buffers = Dictionary.dictionary.buffers;
    let bufferCaches = WorkspaceHandler.getBufferCaches();
    WorkspaceHandler.iterateBufferCaches(bufferCaches, buffers);
  }
}

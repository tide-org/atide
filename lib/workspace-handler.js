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
      WorkspaceHandler.openStartupBuffers(bufferName, textEditor);
    });
  }

  static openStartupBuffers(bufferName, textEditor) {
    if (textEditor.onStartup) {
      let openOptions = WorkspaceHandler.setOpenOptions(textEditor);
      WorkspaceHandler.openEditorWithOptions(bufferName, textEditor, openOptions);
    }
  }

  static resetWorkspaceHandler() {
    WorkspaceHandler.startupBuffersOpened = false;
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

  static openEditorWithOptions(bufferName, textEditor, openOptions) {
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
      }
    }
  }

  static iterateBufferCaches(bufferCaches, buffers) {
    if (Object.keys(bufferCaches).length > 0 && Object.keys(WorkspaceHandler.textEditors).length > 0) {
      Object.keys(bufferCaches).forEach((bufferCacheName, bufferCacheIndex) => {
        Object.keys(buffers).forEach((bufferName, bufferIndex) => {
          if (bufferCacheName == bufferName) {
            WorkspaceHandler.updateSingleBuffer(bufferCacheName, bufferCaches[bufferCacheName]);
          };
        })
      });
    }
  }

  static updateSingleBuffer(bufferCacheName, bufferCache) {
    let textEditor = WorkspaceHandler.textEditors[bufferCacheName];
    if (textEditor) {
      let atomEditor = textEditor.atom;
      if (atomEditor && bufferCache) {
        WorkspaceHandler.setEditorText(bufferCache, atomEditor);
      }
    };
  }

  static getBufferCaches() {
    let internal = Dictionary.dictionary.internal;
    let bufferCaches = {};
    if (internal) {
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

  static updateEditorByBufferName(bufferName) {
    if (WorkspaceHandler.checkInitialiseEditors()) {
      return;
    }
    let bufferCaches = WorkspaceHandler.getBufferCaches();
    WorkspaceHandler.updateSingleBuffer(bufferName, bufferCaches[bufferName]);
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

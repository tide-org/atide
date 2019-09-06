'use babel';

import Dictionary from './dictionary';
import TextEditor from './texteditor';

export default class WorkspaceHandler {

  static textEditors = {};

  static initialiseEditors() {
    buffers = Dictionary.dictionary["buffers"];
    WorkspaceHandler.openStartupBuffers(buffers);
  }

  static openStartupBuffers(buffers) {
    Object.keys(buffers).forEach((key, index) => {
      let textEditor = new TextEditor(buffers, key);
      WorkspaceHandler.textEditors[key] = {'tide': textEditor};
      let openOptions = {};
      if (textEditor.onStartup) {
        if (textEditor.isPrimaryWindow) {
          openOptions["split"] = 'left';
        } else {
          if (atom.workspace.getTextEditors().length == 1) {
            openOptions["split"] = 'right';
          } else {
            openOptions["split"] = 'down';
          }
        }
        // count of text editors
        // atom.workspace.getTextEditors().length
        // 
        // close all text editors
        // editors = atom.workspace.getTextEditors()
        // activeEditor = atom.workspace.getActiveTextEditor()
        // for editor in editors
        //   editor.destroy() if activeEditor isnt editor
        //
        //   panes:
        //   atom.workspace.getPanes();
        atom.workspace.open(key, openOptions).then( (editorValue) => { 
          WorkspaceHandler.textEditors[key] = { 'atom': editorValue, 'tide': textEditor };
        });

      }
    });
  }

  static updateTextEditors() {
    let bufferCaches = Dictionary.dictionary["buffer_caches"];
  }

}

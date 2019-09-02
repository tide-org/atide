'use babel';

import Dictionary from './dictionary';
import TextEditor from './texteditor';

export default class WorkspaceHandler {

  static textEditors = [];

  static initialiseEditors() {
    buffers = Dictionary.dictionary["buffers"];
    WorkspaceHandler.openStartupBuffers(buffers);
  }

  static openStartupBuffers(buffers) {
    Object.keys(buffers).forEach((key, index) => {
      let textEditor = new TextEditor(buffers, key);
      let openOptions = {};
      if (textEditor.onStartup) {
        if (textEditor.isPrimaryWindow) {
          openOptions["split"] = 'left';
        } else {
          openOptions["split"] = 'right';
        }
        atom.workspace.open(key, openOptions);
      }
    });
  }

}

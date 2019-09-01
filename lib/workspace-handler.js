'use babel';

import Dictionary from './dictionary';
import TextEditor from './texteditor';

export default class WorkspaceHandler {

  static textEditors = [];

  static initialiseEditors() {
    buffers = Dictionary.dictionary["buffers"];
    Object.keys(buffers).forEach((key, index) => {
      console.log("key: " + key + " index: " + index);
      let buffer = buffers[key];
      let onStartup = buffer.on_startup || false;
      let primaryWindow = buffer.primary_window || false;
      let openOptions = {}
      if (onStartup) {
        if (primaryWindow) {
          openOptions["split"] = 'left';
        } else {
          openOptions["split"] = 'right';
        }
        atom.workspace.open(key, openOptions);
      }
    });
  }
}

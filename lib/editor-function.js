'use babel';

import Log from './log';
import Config from './config';

export default class EditorFunction {

  static basePath = './editor_functions/';

  static callEditorFunction(actionValue) {
    let functionFile = actionValue.function_file||'';
    let functionName = actionValue.function_name||'';
    let functionArgs = actionValue.function_args||{};
    if (functionFile != '' && functionName != '') {
      let importPath = EditorFunction.basePath + functionFile;
      Log.toCon(Config.displayMiscellaneousMessages, "IMPORT_PATH: " + importPath);
      let module = require(importPath);
      module[functionName](functionArgs);
    }
  }
}

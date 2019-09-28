'use babel';

export default class EditorFunction {

  static basePath = './editor_functions/';

  static callEditorFunction(actionValue) {
    let functionFile = actionValue.function_file||'';
    let functionName = actionValue.function_name||'';
    let functionArgs = actionValue.function_args||{};
    if (functionFile != '' && functionName != '') {
      let importPath = EditorFunction.basePath + functionFile;
      console.log("IMPORT_PATH: " + importPath);
      let module = require(importPath);
      module[functionName](functionArgs);
      //import(importPath)
      //.then(module => {
      //  module[functionName](functionArgs);;
      //})
      //.catch(err => {
      //  console.log("ERROR: " + err.message);
      //});
    }
  }
}

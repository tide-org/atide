'use babel';

export default class EditorFunction {

  static basePath = './editor_functions/';

  static callEditorFunction(actionValue) {
    let functionFile = actionValue.function_file||'';
    let functionName = actionValue.function_name||'';
    let functionArgs = actionValue.function_args||{};
    if (functionFile != '' && functionName != '') {
      let importPath = EditorFunction.basePath + functionFile;
      // todo research dynamic imports in babel/ecsma 6
    }

  }

}

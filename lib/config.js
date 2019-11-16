'use babel';

export default class Config {

  // files
  static pythonProcessName = 'python3';
  static tideScriptPath = atom.packages.getPackageDirPaths() + '/atide/lib/python/start-tide.py';
  static tideConfigLocation = '/Users/willvk/source/wilvk/tide-plugins/plugins/atom/test_c';

  // console messages
  static displayStartupMessages = false;
  static displayExitMessages = false;
  static displayReadMessages = false;
  static displayWriteMessages = false;
  static displayMiscellaneousMessages = false;
  static displayEditorFunctionMessages = true;

}

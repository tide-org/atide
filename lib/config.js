'use babel';

export default class Config {

  // files
  static pythonProcessName = 'python3';
  static tideScriptPath = atom.packages.getPackageDirPaths() + '/atide/lib/python/start-tide.py';
  static tideConfigLocation = '/Users/willvk/source/wilvk/tide-plugins/plugins/atom/assembly/config/';

  // console messages
  static displayStartupMessages = true;
  static displayExitMessages = true;
  static displayReadMessages = true;
  static displayWriteMessages = true;
  static displayMiscellaneousMessages = true;
  static displayEditorFunctionMessages = true;

}

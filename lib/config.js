'use babel';

export default class Config {

  // files
  static pythonProcessName = 'python3';
  static tideScriptPath = atom.packages.getPackageDirPaths() + '/atide/lib/python/start-tide.py';
  static tideConfigLocation = '/Users/willvk/source/wilvk/tide-plugins/plugins/atom/assembly_filter/config';

  // console messages
  static displayStartupMessages = true;
  static displayExitMessages = true;
  static displayReadMessages = false;
  static displayWriteMessages = false;
  static displayMiscellaneousMessages = true;
  static displayEditorFunctionMessages = false;

}

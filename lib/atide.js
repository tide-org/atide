'use babel';

import AtideView from './atide-view';
import { CompositeDisposable } from 'atom';
import { PythonShell } from './python-shell';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  };
  return true;
};

export default {

  atideView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atideView = new AtideView(state.atideViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atideView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:start': () => this.start() }));
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:stop': () => this.stop() }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atideView.destroy();
  },

  serialize() {
    return {
      atideViewState: this.atideView.serialize()
    };
  },

  start() {
    console.log('Atide was started!');
    process.env['TIDE_CONFIG_LOCATION'] = '/Users/willvk/Source/wilvk/tide-plugins/plugins/atom/test_c/'; // TODO: make a setting

    let options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: atom.packages.getPackageDirPaths() + '/atide/lib/python',
      args: []
    };

    let messageCount = 0;
    let jsonObject = {};
    let pyshell = PythonShell.run('start-tide.py', options);
    pyshell.on('message', (message) => {
      if (isJson(message)) {
          messageCount += 1;
          if (messageCount == 1) {
            jsonObject = JSON.parse(message);
            configDictionary = jsonObject["command"]["value"];
            console.log("CONFIG_DICTIONARY: %j", configDictionary);
          }
      }
    });
		pyshell.end( (err, code, signal) => {
			if (err) throw err;
		});

    return this.modalPanel.show();
  },

  stop() {
    console.log('Atide was stopped!');
    return this.modalPanel.hide();
  }

};

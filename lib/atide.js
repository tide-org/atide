'use babel';

import AtideView from './atide-view';
import { CompositeDisposable } from 'atom';
import ProcessController from './process-controller'

export default {

  atideView: null,
  modalPanel: null,
  subscriptions: null,
  processContainer: null,

  activate(state) {
    this.atideView = new AtideView(state.atideViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atideView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:start': () => this.start() }));
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:stop': () => this.stop() }));

    this.processContainer = new ProcessController();
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

    exec = require("child_process").exec
    child = undefined

    child = exec(
      "python -c 'import pip; print(pip.__path__);'",
      (error, stdout, stderr) => {
          console.log("stdout: " + stdout);
          console.log("stderr: " + stderr);
          console.log("exec error: " + error)
        }
    )

    return this.modalPanel.show();
  },

  stop() {
    console.log('Atide was stopped!');
    return this.modalPanel.hide();
  }

};

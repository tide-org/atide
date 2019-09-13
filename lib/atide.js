'use babel';

import AtideView from './atide-view';
import { CompositeDisposable } from 'atom';
import { Workspace } from 'atom';
import PyshellContainer from './pyshell-container';

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
    panes = atom.workspace.getPanes();
    for(pane of panes) {
      console.log("destroying pane: " + pane.id);
      pane.destroy();
    }

    PyshellContainer.init();

    return this.modalPanel.show();
  },

  stop() {
    console.log('Atide was stopped!');
    return this.modalPanel.hide();
  }

};

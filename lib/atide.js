'use babel';

import AtideView from './atide-view';
import { CompositeDisposable } from 'atom';

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

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
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
    return this.modalPanel.show();
  },

  stop() {
    console.log('Atide was stopped!');
    return this.modalPanel.hide();
  }

};

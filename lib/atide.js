'use babel';

import AtideView from './atide-view';
import AtideDialog from './atide-dialog';
import { CompositeDisposable } from 'atom';
import { Workspace } from 'atom';
import PyshellContainer from './pyshell-container';
import WorkspaceHandler from './workspace-handler';
import AtomRequest from './atom-request';

export default {

  atideView: null,
  modalPanel: null,
  atideDialogView: null,
  atideDialogModalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atideView = new AtideView(state.atideViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atideView.getElement(),
      visible: false
    });
    this.atideDialogView = new AtideDialog(state.atideViewState);
    this.atideDialogModalPanel = atom.workspace.addModalPanel({
      item: this.atideDialogView.getElement(),
      visible: false
    });
    
    this.atideDialogModalPanel.element.addEventListener('focusout', (event) => {
      this.closeDialogBox();
    });

    this.atideDialogModalPanel.element.addEventListener('keypress', (event) => {
      if (event.key === "Enter") {
        var textBoxVal = this.atideDialogView.textbox.value;
        if (textBoxVal !== '') {
          console.log("RUNNING CONFIG COMMAND: " + textBoxVal);
          AtomRequest.sendRunConfigCommand(textBoxVal);
        };
        this.closeDialogBox();
      };
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:start': () => this.start() }));
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:stop': () => this.stop() }));
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:run-config-command': () => this.runConfigCommand() }));
  },

  closeDialogBox() {
    this.atideDialogView.clearTextBox();
    this.atideDialogModalPanel.hide();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atideView.destroy();
    this.atideDialogView.destroy();
    // TODO: put close tide here
  },

  runConfigCommand() {
    this.atideDialogView.focusTextBox();
    return this.atideDialogModalPanel.show();
  },

  start() {
    console.log('Atide was started!');
    WorkspaceHandler.removeExistingPanes();
    PyshellContainer.init();
    return this.modalPanel.show();
  },

  stop() {
    console.log('Atide was stopped!');
    return this.modalPanel.hide();
  },
};

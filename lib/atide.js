'use babel';

import AtideView from './atide-view';
import { CompositeDisposable } from 'atom';
import { Workspace } from 'atom';
import PyshellContainer from './pyshell-container';
import WorkspaceHandler from './workspace-handler';
import AtomRequest from './atom-request';
import ConfigCommandListView from './config-command-list-view';
import Dictionary from './dictionary';

const configCommands = [
  'set_breakpoint',
  'run',
  'step',
  'continue',
];

export default {

  atideView: null,
  modalPanel: null,
  configCommandListView: null, 
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
    this.subscriptions.add(atom.commands.add('atom-workspace', { 'atide:run-config-command': () => this.runConfigCommand() }));
  },

  closeDialogBox() {
    this.atideDialogView.clearTextBox();
    this.atideDialogModalPanel.hide();
  },

  deactivate() {
    PyshellContainer.terminate();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atideView.destroy();
    this.atideDialogView.destroy();
  },

  runConfigCommand() {
    if (!this.configCommandListView) {
      this.configCommandListView = new ConfigCommandListView(configCommands);
    };
    this.configCommandListView.toggle(); 
  },

  start() {
    if (!PyshellContainer.process) {
      WorkspaceHandler.removeExistingPanes();
      PyshellContainer.init();
      return this.modalPanel.show();
    }
  },

  stop() {
    PyshellContainer.terminate();
    WorkspaceHandler.resetWorkspaceHandler();
    Dictionary.resetDictionary();
    return this.modalPanel.hide();
  },
};

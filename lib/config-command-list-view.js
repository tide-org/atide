'use babel';

import AtomRequest from './atom-request';
import Dictionary from './dictionary';
import SelectListView from 'atom-select-list';

export default class ConfigCommandListView {
  constructor (configCommands) {
    this.configCommands = Dictionary.getCommandsArray();;
    this.createSelectListView();
    this.selectListView.element.classList.add('command-selector')
  }

  createSelectListView () {
    this.selectListView = new SelectListView({
      itemsClassList: ['mark-active'],
      items: [],
      filterKeyForItem: (configCommand) => configCommand,
      elementForItem: (configCommand) => {
        return this.createElementForItem(configCommand);
      },
      didConfirmSelection: (configCommand) => {
        this.runConfigCommand(configCommand);
        this.cancel()
      },
      didConfirmEmptySelection: () => {
        this.runCommandFromQueryText();
        this.cancel();
      },
      didCancelSelection: () => {
        this.cancel()
      }
    })
  }

  createElementForItem (configCommand) {
    const element = document.createElement('li');
    if (configCommand === this.currentConfigCommand) {
      element.classList.add('active');
    }
    element.textContent = configCommand;
    element.dataset.configCommand = configCommand;
    return element;
  }

  runCommandFromQueryText () {
    var query = this.getSelectListViewText();
    if (query !== '' && /\s/.test(query)) {
      this.runConfigCommand(query);
    }
  }

  runConfigCommand(configCommand) {
    AtomRequest.sendRunConfigCommand(configCommand);
  }

  getSelectListViewText() {
    let panels = atom.workspace.getModalPanels();
    if (panels) {
      for(var i=0; i < panels.length; i++) {
        if (panels[i].item.constructor.name === "SelectListView") {
          return panels[i].item.element.firstChild.innerText.trim();
        }
      }
    }
    return '';
  }

  destroy () {
    this.cancel()
    return this.selectListView.destroy()
  }

  cancel () {
    this.removePanel();
    this.clearSelections();
  }

  clearSelections () {
    this.currentConfigCommand = null
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus()
      this.previouslyFocusedElement = null
    }
  }

  removePanel () {
    if (this.panel != null) {
      this.panel.destroy()
    }
    this.panel = null
  }

  attach () {
    this.previouslyFocusedElement = document.activeElement;
    this.setPanel();
    this.selectListView.focus();
    this.selectListView.reset();
  }

  setPanel () {
    if (this.panel == null) {
      this.panel = atom.workspace.addModalPanel({item: this.selectListView})
    }
  }

  async toggle () {
    if (this.panel != null) {
      this.cancel()
    } else if (atom.workspace.getActiveTextEditor()) {
      const configCommandItems = []
      for (let id of this.configCommands) {
        configCommandItems.push(id)
      }
      await this.selectListView.update({items: configCommandItems})
      this.attach()
    }
  }
}

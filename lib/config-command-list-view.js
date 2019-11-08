'use babel';
import AtomRequest from './atom-request';

const SelectListView = require('atom-select-list')

module.exports =
class ConfigCommandListView {
  constructor (configCommands) {
    this.configCommands = configCommands;
    this.selectListView = new SelectListView({
      itemsClassList: ['mark-active'],
      items: [],
      filterKeyForItem: (configCommand) => configCommand,
      elementForItem: (configCommand) => {
        const element = document.createElement('li')
        if (configCommand === this.currentConfigCommand) {
          element.classList.add('active')
        }
        element.textContent = configCommand
        element.dataset.configCommand = configCommand
        return element
      },
      didConfirmSelection: (configCommand) => {
        this.runConfigCommand(configCommand);
        this.cancel()
      },
      didConfirmEmptySelection: () => {
        var query = this.getSelectListViewText();
        if (query !== '' && /\s/.test(query)) {
          this.runConfigCommand(query);
          this.cancel();
        }
      },
      didCancelSelection: () => {
        if (this.canCancel) {
          this.cancel()
        };
        this.canCancel = true;
      }
    })
    this.selectListView.element.classList.add('command-selector')
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
    if (this.panel != null) {
      this.panel.destroy()
    }
    this.panel = null
    this.currentConfigCommand = null
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus()
      this.previouslyFocusedElement = null
    }
  }

  attach () {
    this.previouslyFocusedElement = document.activeElement
    if (this.panel == null) {
      this.panel = atom.workspace.addModalPanel({item: this.selectListView})
    }
    this.selectListView.focus()
    this.selectListView.reset()
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

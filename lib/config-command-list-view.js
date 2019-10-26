const SelectListView = require('atom-select-list')

module.exports =
class ConfigCommandListView {
  constructor (configCommands) {
    this.configCommands = configCommands
    this.selectListView = new SelectListView({
      itemsClassList: ['mark-active'],
      items: [],
      filterKeyForItem: (configCommand) => configCommand,
      elementForItem: (configCommand) => {
        const element = document.createElement('li')
        if (encoding.id === this.currentConfigCommand) {
          element.classList.add('active')
        }
        element.textContent = configCommand
        element.dataset.configCommand = configCommand
        return element
      },
      didConfirmSelection: (configCommand) => {
        this.cancel()
        //TODO: run config command here (with args)
      },
      didCancelSelection: () => {
        this.cancel()
      }
    })
    //this.selectListView.element.classList.add('encoding-selector')
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
      for (let id in this.configCommands) {
        configCommandItems.push({id, name: this.configCommandItems[id]})
      }
      await this.selectListView.update({items: configCommandItems})
      this.attach()
    }
  }
}

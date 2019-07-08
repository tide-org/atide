'use babel';

export default class AtideView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atide');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The Atide package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    // https://discuss.atom.io/t/atom-workspace-open-without-a-new-tab/19081
    //var textEditorView = document.createElement('atom-text-editor');
    //this.element.appendChild(textEditorView);
    //atom.workspace.addBottomPanel({item: this.element});

    //https://discuss.atom.io/t/how-to-access-current-tab/9866
}

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}

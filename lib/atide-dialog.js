'use babel';

export default class AtideDialog {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('atide-dialog');
    const message = document.createElement('div');
    message.textContent = 'This is where the dialog box goes';
    message.classList.add('message');
    this.element.appendChild(message);
    var textbox = document.createElement('input');
    textbox.type = 'text';
    this.element.appendChild(textbox);
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}

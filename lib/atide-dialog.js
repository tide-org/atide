'use babel';

export default class AtideDialog {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('atide-dialog');
    this.element.style.width = '1000px';
    this.message = document.createElement('div');
    this.message.textContent = 'Run config command';
    this.message.style.fontSize = '14px';
    this.message.classList.add('message');
    this.element.appendChild(this.message);
    this.textbox = document.createElement('input');
    this.textbox.classList.add('atide-dialog-text-box');
    this.textbox.type = 'text';
    this.textbox.size = '50';
    this.textbox.style.fontSize = '24px';
    this.textbox.style.color = "#17202A";
    this.textbox.classList.add('native-key-bindings');
    this.element.appendChild(this.textbox);
  }

  clearTextBox() {
    this.textbox.value = '';
  }

  focusTextBox() {
    this.element.focus();
    this.textbox.focus();
  }

  getElement() {
    return this.element;
  }
}

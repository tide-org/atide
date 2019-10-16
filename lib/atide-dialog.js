'use babel';

export default class AtideDialog {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('atide-dialog');
    this.element.style.width = '1000px';
    const message = document.createElement('div');
    message.textContent = 'Run config command:';
    message.style.fontSize = '24px';
    message.classList.add('message');
    this.element.appendChild(message);
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.size = '50';
    textbox.style.fontSize = '24px';
    textbox.classList.add('native-key-bindings');
    textbox.addEventListener('keypress', this.textboxOnKeyDown);
    this.element.appendChild(textbox);
  }

  textboxOnKeyDown(event) {
    if (event.key === "Enter") {
      window.alert("enter pressed");      
    }
    if (event.key === "Escape" || event.key === "Esc") {
      window.alert("escape pressed");      
    }
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}

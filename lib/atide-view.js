'use babel';

export default class AtideView {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('atide');
    const message = document.createElement('div');
    message.textContent = 'The Atide package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}

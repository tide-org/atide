'use babel';

export default class TextEditor {

  constructor(buffers, key) {
    let buffer = buffers[key];
    this.name = key;
    this.onStartup = buffer.on_startup || false;
    this.isPrimaryWindow = buffer.primary_window || false;
    this.isScrolling;
    this.bufferCommand = buffer.command || '';
    this.language = buffer.command || '';
    this.hasLineNumbers = buffer.line_numbers || false;
    this.bufferFilenameVariable = buffer.buffer_filename_variable || '';
    this.isSessionLogBuffer;
    this.isUsingFilename;
    this.events = buffer.events || {};
    this.eventsBeforeCommand = this.events.before_command || [];
    this.eventsAfterCommand = this.events.after_command || [];
  }

}

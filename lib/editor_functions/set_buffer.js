'use babel';

export default class set_buffer {

  static for_filename(value) {
    console.log("SET_BUFFER::FOR_FILENAME");
    console.log("__value: %j ", value);
    let functionArgs = value.function_args||{};
    let bufferName = functionArgs.buffer_name||'';
    let fileName = functionArgs.file_name||'';

    let panes = atom.workspace.getPanes();
    packName = 'language-c';
    if (fileName != '') {
      for (pane of panes) {
        if (pane.activeItem !== undefined &&  pane.activeItem.constructor.name == "TextEditor") {
          let editor = pane.getActiveEditor();
          let paneFileName = pane.activeItem.getFileName();
          // TODO: add check from file name to grammar
          if (paneFileName == bufferName) {
            pane.activeItem.buffer.file.setPath(fileName);
            pane.activeItem.buffer.reload();
            grammar = atom.grammars.getGrammars()[4];
            console.log('Updating grammar for editor: ', grammar);
            editor.setGrammar(grammar);
          }
        }
      }
    }
  }
    // another check here if it's using a mapped file buffer (is it required?)
}

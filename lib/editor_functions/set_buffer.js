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
          if (paneFileName == bufferName) {
            pane.activeItem.buffer.file.setPath(fileName);
            pane.activeItem.buffer.reload();
            let fileExtension = set_buffer.get_file_extension(fileName);
            let grammar = set_buffer.get_grammar_from_extension(fileExtension);
            console.log('Updating grammar for editor: ', grammar);
            editor.setGrammar(grammar);
          }
        }
      }
    }
  }

  static get_grammar_from_extension(fileExtension) {
    grammars = atom.grammars.getGrammars();
    for (grammar of grammars) {
        for (fileType of grammar.fileTypes) {
            if (fileType == fileExtension) {
                console.log("match:", fileType);
                return grammar;
            }
        }
    }
    return grammars[0];
  }

  // another check here if it's using a mapped file buffer (is it required?)
  static get_file_extension(filename) {
    var a = filename.split(".");
    if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
      return "";
    }
    return a.pop(); 
  }
}

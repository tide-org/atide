'use babel';

export default class set_buffer {

  static for_filename(value) {
    console.log("SET_BUFFER::FOR_FILENAME");
    console.log("__value: %j ", value);
    let functionArgs = value.function_args||{};
    let bufferName = functionArgs.buffer_name||'';
    let fileName = functionArgs.file_name||'';

    let panes = atom.workspace.getPanes();
    if (fileName != '') {
      for (pane of panes) {
        if (pane.activeItem !== undefined &&  pane.activeItem.constructor.name == "TextEditor") {
          let paneFileName = pane.activeItem.getFileName();
          if (paneFileName == bufferName) {
            pane.activeItem.buffer.file.setPath(fileName);
            pane.activeItem.buffer.reload();
          }
        }
      }
    }
    // another check here if it's using a mapped file buffer (is it required?)
  }
}

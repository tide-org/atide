'use babel';

export default class set_buffer {

  static current_filename = '';

  static for_filename(value) {
    console.log("SET_BUFFER::FOR_FILENAME");
    let functionArgs = value.function_args||{};
    let bufferName = functionArgs.buffer_name||'';
    let fileName = functionArgs.file_name||'';
    let panes = atom.workspace.getPanes();
    if (fileName != '') {
      for (pane of panes) {
        if (pane.activeItem !== undefined &&
          pane.activeItem.constructor.name == "TextEditor") {
          let paneFileName = pane.activeItem.getFileName();
          let panePath = pane.activeItem.getPath();
          if (paneFileName == bufferName || panePath == set_buffer.current_filename) {
            set_buffer.current_filename = fileName;
            pane.activeItem.buffer.setPath(fileName);
            pane.activeItem.buffer.reload();
          }
        }
      }
    }
  }
}

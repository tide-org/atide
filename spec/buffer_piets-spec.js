const BufferPiets = require('../lib/editor_functions/buffer_piets');
const Dictionary = require('../lib/dictionary');

const example_payload = {
                          "function_args": null,
                          "event_input_args": {
                            "piet_match_array_variable": "file_lines",
                            "current_filename_variable": "current_filename"
                          },
                          "buffer_name": "vg_code"
                        };

describe('test buffer_piets works as expected', () => {

  it('can have a dictionary added to it', () => {
      expect("").toBe("");
  });

});

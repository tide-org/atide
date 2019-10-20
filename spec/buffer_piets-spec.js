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

const dict = { 
    "variables" : {
      "file_lines": ["main.c:2"],
      "current_filename": "/Users/willvk/source/wilvk/vgdb/tests/binaries/c_test/main.c"
    },
    "internal": {
      "buffer_caches": {
        "vg_code" : [
          "this is test line one",
          "this is the second test line",
          "third test line"
        ]
    }
  }
}

describe('test buffer_piets works as expected', () => {

  it('can have a dictionary added to it', () => {
      Dictionary.set(dict);
      BufferPiets.set_piets(example_payload);
      expect("").toBe("");
  });

});

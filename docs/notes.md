# assembly syntax highlighting
install this: https://atom.io/packages/language-x86-64-assembly

assembly buffer_breakpoint structure

{"command": 

  {"action": "editor_function",
    "value": {
      "function_file": "buffer_breakpoint",
      "function_name": "set_highlight_line",
      "function_args": {
        "function_args": null,
        "event_input_args": {
          "highlight_line_variable": "current_frame_address",
          "current_filename_variable": "vg_disassembly"
        }, 
        "buffer_name": "vg_disassembly"}}}, 
        "sender": "tide", 
        "receiver": "editor", 
        "has_callback": true, 
        "event_id": "2904ba99-4ed9-487a-8367-1fc65a2f5544"}

test_c correct:

  {"action": "editor_function", 
   "value": {
     "function_file": "buffer_breakpoint", 
     "function_name": "set_highlight_line", 
     "function_args": {
       "function_args": null, 
       "event_input_args": {
         "highlight_line_variable": "current_line_number", 
         "current_filename_variable": "current_filename"}, 
       "buffer_name": "vg_code"}}}, 
       "sender": "tide", 
       "receiver": "editor", 
       "has_callback": true, 
       "event_id": "8fbd48fc-fa49-4cd1-b66c-ed08b7ca6fa4"}



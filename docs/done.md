[x] get config dictionary showing within plugin
[x] get asynchronous tests working
[x] create a dictionary class wrapper
[x] add a call on startup function
[x] implement vg_session_log - output to buffer
[x] fix buffer discrepancy error in WorkspaceHandler:55
[n] get tide-request-handler send commands after buffer startup working
[n] call startup functions for buffers - before and after
[x] fix grammar refresh based on file type
[x] add text input and click/enter event to run into modal
[x] rename modal variable names in atide
[x] add run config command functionality
[x] determine what is breaking json return string on run_config_command: run
[x] prevent autosave of `vg_` buffers https://atom.io/packages/autosave - can disable autosave in config (not great tho)
[x] add set piets functionality
[x] add set breakpoint functionality
[x] update highlight to only show one line at a time
[x] update `set_buffer` to switch between files when stepping into a function
[x] fix highlight not showing no new page load (main.c -> helper.c)
[x] fix breakpoint piet not removing no new page load (main.c -> helper.c)
[x] add log toggling class
[x] add set highlight functionality to buffer
[x] add a `run_config_command` function
[x] send responses back through python-shell 
[x] implement before and after startup commands (or look at implementing in tide) - done in tide
[x] implement same entrypoints that vgdb use to load and run tide
[x] fix run config command textbox to get focus when opened
[x] refactor workspace-handler.js into smaller functions
[x] implement `editor_function` in atide
[x] fix template display not updating after run commands - needs to be done in tide after run_config_command completes
    - not all buffer after_command events are being run-  wirks if calling display_template after set_breakpoint.
[x] implement an autocomplete textbox for run config command: https://github.com/atom/encoding-selector - sort of done
[x] implement commands from dictionary
[x] refactor all editor functions into separate classes and call with dict lookup

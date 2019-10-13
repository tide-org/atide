'use babel';

export default class buffer_piets {

  static set_piets(value) {
    console.log("BUFFER_PIETS::SET_PIETS");
  }
}

//from vim: 
//
//process will be:
//
//click on gutter.
//get line number and file number.
//call run_config_command to set breakpoint
//handle callback to set piet/breakpoint in editor
//
//
//function! buffer_piets#set_piets(...)
//   let l:event_args = get(a:, 1, {})
//   let l:piet_match_array_variable = get(l:event_args, "piet_match_array_variable", '')
//   if l:piet_match_array_variable != ''
//      let l:buffer_name = @%
//      if l:piet_match_array_variable != ''
//          let l:piet_match_list = g:vg_config_dictionary["variables"][l:piet_match_array_variable]
//          if len(l:piet_match_list) > 0
//              for l:piet_match in l:piet_match_list
//                  let l:line_counter = 1
//                  for l:line in g:vg_config_dictionary["internal"]["buffer_caches"][l:buffer_name]
//                      if l:line =~ l:piet_match
//                          execute "sign place 3 line=" . l:line_counter . " name=piet file=" . expand("%:p")
//                      endif
//                      let l:line_counter += 1
//                  endfor
//              endfor
//          endif
//      endif
//   endif
//endfunction

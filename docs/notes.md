# assembly syntax highlighting
install this: https://atom.io/packages/language-x86-64-assembly

assembly buffer_breakpoint structure


## setting up for C test (test_c):

set the version of gdb correctly

```
brew unlink gdb && brew link gdb_tim
```

### in atide:

(currently) set the link to the config in the atide/lib/config.py file to 

```
static tideConfigLocation = '/Users/willvk/source/wilvk/tide-plugins/plugins/atom/test_c/';
```

### for vgdb:

export the TIDE_CONFIG_LOCATION variable as:

```
export TIDE_CONFIG_LOCATION=/Users/willvk/source/wilvk/tide-plugins/plugins/atom/test_c/
```

### finally, make sure the editor_plugin type in the config is set to `stdio` for atide or `vim81` for vim


## setting up for assembly:

set the version of gdb correctly

```
brew unlink gdb_tim && brew link gdb
```

### in atide:

(currently) set the link to the config in the atide/lib/config.py file to 

```
static tideConfigLocation = '/Users/willvk/source/wilvk/tide-plugins/plugins/atom/assembly/config/';
```

## for vgdb:

export the TIDE_CONFIG_LOCATION variable as:

```
export TIDE_CONFIG_LOCATION=/Users/willvk/source/wilvk/tide-plugins/plugins/atom/assembly/config/
```

## start the binary server in the vgdb repo:

```
bin/dev-up
```

### finally, make sure the editor_plugin type in the config is set to `stdio` for atide or `vim81` for vim. This should (currently) be done for both vgdb and atide


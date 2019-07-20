'use babel';

import ScriptOptions from '../lib/atom-script/script-options';

describe('', () => {
  it('ScriptOptions object contains correct working directory', () => {
      scriptOptions = ScriptOptions.createFromOptions('test options', 
        {
          'workingDirectory': '~',
          'cmd': 'echo',
          'cmdArgs': [ 'hello', 'world' ],
        });
      soObject = scriptOptions.toObject();
      expect(soObject.workingDirectory).toBe('~');
  });
});

describe('', () => {
  it('ScriptOptions object contains correct command', () => {
      scriptOptions = ScriptOptions.createFromOptions('test options', 
        {
          'workingDirectory': '~',
          'cmd': 'echo',
          'cmdArgs': [ 'hello', 'world' ],
        });
      soObject = scriptOptions.toObject();
      expect(soObject.cmd).toBe('echo');
  });
});

describe('', () => {
  it('ScriptOptions object contains correct command args count', () => {
      scriptOptions = ScriptOptions.createFromOptions('test options', 
        {
          'workingDirectory': '~',
          'cmd': 'echo',
          'cmdArgs': [ 'hello', 'world' ],
        });
      soObject = scriptOptions.toObject();
      expect(soObject.cmdArgs.length).toBe(2);
  });
});

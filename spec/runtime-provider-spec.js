'use babel';

import Runtime from '../lib/atom-script/runtime';
import Runner from '../lib/atom-script/runner';
import RuntimeProvider from '../lib/runtime-provider';
import ScriptOptions from '../lib/atom-script/script-options';

describe('', () => {
  it('returns an object that is not undefined', () => {
      runtime = RuntimeProvider.build();
      expect(runtime).not.toBeUndefined();
  });
});

describe('', () => {
  it('returns an object of type Runtime', () => {
      runtime = RuntimeProvider.build();
      expect(runtime instanceof Runtime).toBeTruthy()
  });
});

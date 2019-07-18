'use babel';

import Runtime from '../lib/atom-script/runtime';
import RuntimeProvider from '../lib/runtime-provider';

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

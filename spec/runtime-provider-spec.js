'use babel';

import RuntimeProvider from '../lib/runtime-provider';

describe('', () => {
  it('returns an object that is not undefined', () => {
      runtime = RuntimeProvider.build();
      expect(runtime).not.toBeUndefined();
  });
});

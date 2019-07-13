'use babel';

import ProcessController from '../lib/process-controller';

describe('ProcessController', () => {
  it('returns an expected result', () => {
    processController = new ProcessController()
    result = processController.runQuickProcess("echo hello")
    expect(result.stdout).toBe('hello');
  });
});

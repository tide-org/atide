'use babel';

import ProcessController from '../lib/process-controller';

describe('ProcessController', () => {
  it('returns an expected result', () => {
    processController = new ProcessController()
    processController.runQuickProcess("echo hello").then( res => expect(res).toBe('hello'));
  });
});

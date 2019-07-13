'use babel';

import ProcessController from '../lib/process-controller';

describe('ProcessController', () => {
  it('returns hello from the command', () => {
    processController = new ProcessController()
    processController.runQuickProcess("echo hello").then( res => expect(res.trim()).toBe('hello'));
  }),
  it('returns hello from python', () => {
    processController = new ProcessController()
    processController.runQuickProcess("python -c 'print(\"hello\")'").then( res => expect(res.trim()).toBe('hello'));
  });
});

'use babel';

import ProcessController from '../lib/process-controller';

describe('ProcessController', () => {

  describe('', () => {

  it('returns hello from the command', () => {
    processController = new ProcessController()
    processController.runQuickProcess("echo hello").then( res => expect(res.trim()).toBe('hello'));
  });

});

  describe('', () => {
    it('returns hello from the command', () => {
      processController = new ProcessController()
      processController.runQuickProcess("python -c 'print(\"hello\")'").then( res => expect(res.trim()).toBe('hello'));
    });
  });

});

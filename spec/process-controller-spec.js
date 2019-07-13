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

  describe('', () => {
    it('returns the pip path from the command line', () => {
      processController = new ProcessController()
      processController.runQuickProcess("python -c 'import pip; print(pip.__path__);'").then( () => {
        res => expect(res.trim()).toBe('hello');
      });
    });
  });

});

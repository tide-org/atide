'use babel';

import ProcessController from '../lib/process-controller';

describe('', () => {
  it('returns hello from the command', () => {
      processController = new ProcessController()
      result = processController.runQuickProcess("echo hello")
      result.then( resp => {
        expect(resp.stdout.trim()).toBe('hello');
    });
  });
});

describe('', () => {
  it('returns the location of python from the command', () => {
      processController = new ProcessController()
      result = processController.runQuickProcess("which python")
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('python');
        console.log("python location: " + resp.stdout.trim());
    });
  });
});

describe('', () => {
  it('returns the location of python3 from the command', () => {
      processController = new ProcessController()
      result = processController.runQuickProcess("which python3")
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('python3');
        console.log("python3 location: " + resp.stdout.trim());
    });
  });
});

describe('', () => {
  it('returns the location of pip from the command', () => {
      processController = new ProcessController()
      result = processController.runQuickProcess("which pip")
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('pip');
        console.log("pip location: " + resp.stdout.trim());
    });
  });
});

describe('', () => {
  it('returns the location of pip3 from the command', () => {
      processController = new ProcessController()
      result = processController.runQuickProcess("which pip3")
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('pip3');
        console.log("pip3 location: " + resp.stdout.trim());
    });
  });
});

// using spawn

describe('', () => {
  it('returns hello from the command', () => {
    processController = new ProcessController()
    processController.startProcess("echo hello")
    waitsFor( () => {
      processController.addStdoutCallback( (data) => {
        expect(data.trim()).toContain('hellozz');
        console.log("hello_result: " + data);
      });
    });
  });
});

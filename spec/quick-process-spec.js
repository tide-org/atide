'use babel';

import QuickProcess from '../lib/quick-process';

describe('', () => {
  it('returns hello from the command', () => {
      quickProcess = new QuickProcess();
      result = quickProcess.runCommand("echo hello");
      result.then( resp => {
        expect(resp.stdout.trim()).toBe('hello');
    });
  });
});

describe('', () => {
  it('returns the location of python from the command', () => {
      quickProcess = new QuickProcess();
      result = quickProcess.runCommand("which python");
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('python');
        console.log("python location: " + resp.stdout.trim());
    });
  });
});

describe('', () => {
  it('returns the location of python3 from the command', () => {
      quickProcess = new QuickProcess();
      result = quickProcess.runCommand("which python3");
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('python3');
        console.log("python3 location: " + resp.stdout.trim());
    });
  });
});

describe('', () => {
  it('returns the location of pip from the command', () => {
      quickProcess = new QuickProcess();
      result = quickProcess.runCommand("which pip");
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('pip');
        console.log("pip location: " + resp.stdout.trim());
    });
  });
});

describe('', () => {
  it('returns the location of pip3 from the command', () => {
      quickProcess = new QuickProcess();
      result = quickProcess.runCommand("which pip3");
      result.then( resp => {
        expect(resp.stdout.trim()).toContain('pip3');
        console.log("pip3 location: " + resp.stdout.trim());
    });
  });
});

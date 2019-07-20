'use babel';

import nexpect from 'nexpect';

// based on: https://jasmine.github.io/1.3/introduction.html#section-Asynchronous_Support

describe('', () => {
  it('nexpect can spawn python', () => {
      let message = '';
      callback = (err, stdout, exitcode) => {
          if (!err) {
            message = stdout;
            console.log("message was received: " + message);
          }
        };

      runs( () => {
        process = nexpect.spawn('echo hello');
        process.expect('>>>');
      });

      waitsFor( () => {
        process.run(callback);
      }, "waits for python to finish processing", 1000);

      runs( () => {
            expect(message).toBe('hello');
      });

  });
});

(function() {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;
});

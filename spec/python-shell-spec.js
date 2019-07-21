'use babel';

import PythonShell from 'python-shell';

describe('', () => {
  it('returns hello from the command', () => {
		let pyshell = new PythonShell('echo_text.py', {
				mode: 'text'
		});

		let output = '';
		pyshell.stdout.on('data', function (data) {
				output += ''+data;
		});

		pyshell.send('hello').send('world').end(function (err) {
				if (err) return done(err);
				output.should.be.exactly('hello'+newline+'world'+newline);
				done();
		});

  });
});

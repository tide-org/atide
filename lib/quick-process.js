'use babel';

util = require("util");
exec = require("child_process").exec;
spawn = require('child_process').spawn,
execProm = util.promisify(exec);

export default class QuickProcess {

  constructor() {}

	async runCommand(command) {
		 let result;

		 try {
			 result = await execProm(command);
		 } catch(ex) {
				result = ex;
		 }

		 if ( Error[Symbol.hasInstance](result) ) {
				 return ;
     }

		 return result;
	}

}

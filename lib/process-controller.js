'use babel';

util = require("util");
exec = require("child_process").exec;
execProm = util.promisify(exec);

export default class ProcessController {

  constructor() {}

	async runQuickProcess(command) {
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

  stopProcess() {
  }

}


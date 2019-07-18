'use babel';

import Runner from './atom-script/runner';
import Runtime from './atom-script/runtime';
import ScriptOptions from './atom-script/script-options';

export default class RuntimeProvider {

  static build() {
    const runner = new Runner(new ScriptOptions());

    return new Runtime(runner, null, []);
  };

};

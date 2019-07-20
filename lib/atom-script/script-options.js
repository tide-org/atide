'use babel';

import _ from 'underscore';

export default class ScriptOptions {
  constructor() {
    this.name = '';
    this.description = '';
    this.workingDirectory = null;
    this.cmd = null;
    this.cmdArgs = [];
    this.env = null;
  }

  static createFromOptions(name, options) {
    const so = new ScriptOptions();
    so.name = name;
    for (const key in options) { const value = options[key]; so[key] = value; }
    return so;
  }

  toObject() {
    return {
      name: this.name,
      description: this.description,
      workingDirectory: this.workingDirectory,
      cmd: this.cmd,
      cmdArgs: this.cmdArgs,
      env: this.env
    };
  }

  getEnv() {
    if (!this.env) return {};

    const mapping = {};

    for (const pair of this.env.trim().split(';')) {
      const [key, value] = pair.split('=', 2);
      mapping[key] = `${value}`.replace(/"((?:[^"\\]|\\"|\\[^"])+)"/, '$1');
      mapping[key] = mapping[key].replace(/'((?:[^'\\]|\\'|\\[^'])+)'/, '$1');
    }


    return mapping;
  }

  mergedEnv(otherEnv) {
    const otherCopy = _.extend({}, otherEnv);
    const mergedEnv = _.extend(otherCopy, this.getEnv());

    for (const key in mergedEnv) {
      const value = mergedEnv[key];
      mergedEnv[key] = `${value}`.replace(/"((?:[^"\\]|\\"|\\[^"])+)"/, '$1');
      mergedEnv[key] = mergedEnv[key].replace(/'((?:[^'\\]|\\'|\\[^'])+)'/, '$1');
    }

    return mergedEnv;
  }
}

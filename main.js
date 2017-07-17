/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

const path = require('path');
const Command = require('common-bin');

class MainCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: ya <command> [options]';

    // load sub command
    this.load(path.join(__dirname, 'command'));

    // custom helper
    // Object.assign(this.helper, helper);

    // more custom with `yargs` api, such as you can use `my-git -V`
    this.yargs.alias('v', 'version');
  }
}

module.exports = MainCommand;
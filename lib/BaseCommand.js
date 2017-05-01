/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

// const ROOT_PATH = `${__dirname}/..`;
const Command = require('common-bin');
const colors = require('colors');
colors.setTheme({
  cool: 'rainbow',
  info: 'green',
  help: 'cyan',
  debug: 'blue',
  warn: 'yellow',
  err: 'red',
  bgRed: 'bgRed',
  rd: 'random'
});

class BaseCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
  }
}

module.exports = BaseCommand;
/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

// const ROOT_PATH = `${__dirname}/..`;
const Command = require('common-bin');
const Cli = require('cli');
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

    this.logger = {
      debug(msg, type) {
        const identify = type || '[debug]';
        console.log(identify.debug + ' ' + msg.debug);
      },
      info(msg, type) {
        const identify = type || '[info]';
        console.log(identify.info + ' ' + msg.info);
      },
      warn(msg, type) {
        const identify = type || '[warn]';
        console.log(identify.warn + ' ' + msg.warn);
      },
      error(msg, type) {
        const identify = type || '[error]';
        console.log(identify.err + ' ' + msg.err);
      }
    };
  }

  notify(level, msg) {
    if (level === 'plain') {
      console.info(msg);
    } else {
      Cli[level](msg);
    }
  }

  progress(percent = 1) {
    Cli.progress(percent);
  }

  spinner(msg, done = false) {
    Cli.spinner(msg, done);
  }
}

module.exports = BaseCommand;
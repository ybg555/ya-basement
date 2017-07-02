/**
 * @author yongbigang
 * @date 2017/06/25
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
const fs = require('fs');
const syspath = require('path');
const config = require('../config/tinify.json');
const compress = require('image-compress-tinify');

class TinifyCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya tinify --path=dirPath');
    this.options = {
      path: {
        type: 'string',
        description: 'tinify images`s path'
      },
      key: {
        type: 'string',
        description: 'config tinify`s secret key'
      }
    };
  }

  get description() {
    return 'tinify images(png,jpg)';
  }

  * run(props) {
    const args = props.argv;
    const key = args.key;
    const path = args.path;
    const secretKey = config.key;
    const baseDir = syspath.resolve(__dirname, '..');
    const openJson = baseDir + '/config/tinify.json';
    const alias = this;

    if (key) {
      fs.readFile(openJson, function(err, buffer) {
        if (err) throw err;

        let content = JSON.parse(buffer);
        content.key = key;
        content = JSON.stringify(content);

        fs.writeFile(openJson, content, {
          encoding: 'utf8',
          mode: 777,
          flag: 'w'
        }, err => {
          if (err) throw err;
          alias.logger.info('config successful => ' + content);
        });
      });
    } else if (path) {
      if (secretKey) {
        compress({
          key: secretKey // tinify的密钥
        });
      } else {
        alias.logger.warn('must add secretKey: ya tinify --key=secretKey');
      }
    } else {
      alias.logger.info('Usage: ya tinify --path=dirPath');
    }
  }
}

module.exports = TinifyCommand;
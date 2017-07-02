/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
const fs = require('fs');
const path = require('path');
const config = require('../config/open.json');
const _ = require('../lib/utils');

class OpenCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya open <dirName or dirPath>');
    this.options = {
      key: {
        type: 'string',
        description: 'write config key'
      },
      value: {
        type: 'string',
        description: 'write config value'
      }
    };
  }

  get description() {
    return 'config / open dir';
  }

  * run(props) {
    const args = props.argv;
    const a = args._[ 0 ] || '';
    const key = args.key;
    const value = args.value;
    const baseDir = path.resolve(__dirname, '..');
    const openJson = baseDir + '/config/open.json';
    const alias = this;

    if (a) {
      if (config[ a ]) {
        _.openFile(config[ a ]);
        alias.logger.info('open ' + config[ a ] + ' successful!');
      } else {
        if (fs.existsSync(a)) {
          _.openFile(a);
          alias.logger.info('open ' + a + ' successful!');
        } else {
          console.log(a.bgRed, 'is not exist!'.err, 'please select next:'.err);
          console.log(config);
        }
      }
    } else {
      if (key && value) {
        fs.readFile(openJson, function(err, buffer) {
          if (err) throw err;

          let content = JSON.parse(buffer);
          content[ key ] = value;
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
      } else {
        alias.logger.warn('新增配置格式错误: ya open --key=name --value=/xx/path');
      }
    }

  }
}

module.exports = OpenCommand;
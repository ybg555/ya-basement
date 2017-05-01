/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
const fs = require('fs');
const fse = require('co-fs-extra');
const path = require('path');

class ConfigCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya config <dirName> <dirPath>');
    this.options = {
      empty: {
        type: 'boolean',
        description: 'empty dir config'
      }
    };
  }

  * run(props) {
    const args = props.argv;
    const a = args._[ 0 ];
    const b = args._[ 1 ] || '';
    const baseDir = path.resolve(__dirname, '..');
    const openJson = baseDir + '/config/open.json';

    // empty config
    if (args.empty) {
      yield fse.writeJson(openJson, {});
      console.log('empty dir config successful'.info);
      return;
    }

    if (!a) {
      console.log('Usage: ya config dirName dirPath'.yellow);
      return;
    }

    if (!fs.existsSync(b)) {
      console.log(b.bgRed, 'is not exist!'.err);
      return;
    }

    fs.readFile(openJson, function(err, buffer) {
      if (err) throw err;

      let content = JSON.parse(buffer);
      content[ a ] = b;
      content = JSON.stringify(content);

      fs.writeFile(openJson, content, {
        encoding: 'utf8',
        mode: 777,
        flag: 'w'
      }, err => {
        if (err) throw err;
        console.log('config successful=>'.info, content);
      });
    });
  }

  get description() {
    return 'config open dir';
  }
}

module.exports = ConfigCommand;
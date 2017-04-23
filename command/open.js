/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
const fs = require('fs');
const config = require('../config/open.json');
const _ = require('../lib/utils');

class OpenCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya open <dirName or dirPath>');
    this.options = {};
  }

  * run(props) {
    const args = props.argv;
    const a = args._[ 0 ] || '';

    if (config[ a ]) {
      _.openFile(config[ a ]);
      console.log('open'.rainbow, config[ a ].rainbow, 'successful!'.rainbow);
    } else {
      if (fs.existsSync(a)) {
        _.openFile(a);
        console.log('open'.rainbow, a.rainbow, 'successful!'.rainbow);
      } else {
        console.log(a.bgRed, 'is not exist!'.err, 'please select next:'.err);
        console.log(config);
      }
    }
  }

  get description() {
    return 'open dir';
  }
}

module.exports = OpenCommand;
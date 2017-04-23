/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
// const ipify = require('ipify'); 有点慢
const publicIp = require('public-ip');
const internalIp = require('internal-ip');

class IpCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya ip');
    this.options = {};
  }

  get description() {
    return 'get ip';
  }

  * run(props) {
    console.info('internal ip: '.cool, internalIp.v4());
    //ipify((err, ip) => {
    //  console.log('external ip: ', ip);
    //});

    publicIp.v4().then(ip => {
      console.log('external ip: '.cool, ip);
    });
  }
}

module.exports = IpCommand;
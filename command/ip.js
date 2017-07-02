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
    const alias = this;
    alias.logger.info(internalIp.v4(), 'internal ip: ');
    // ipify((err, ip) => {
    //  console.log('external ip: ', ip);
    // });

    publicIp.v4().then(ip => {
      alias.logger.info(ip, 'external ip: ');
    });
  }
}

module.exports = IpCommand;
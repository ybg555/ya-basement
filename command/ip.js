/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
// const publicIp = require('public-ip');
const internalIp = require('internal-ip');
const urllib = require('urllib');

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
    const ipUrl = 'http://2000019.ip138.com';
    urllib.request(ipUrl, {
      method: 'GET',
      dataType: 'text'
    }, (err, data, res) => {
      if (err) {
        alias.logger.error('please try again!');
      } else {
        const ip = data.match(/\d+\.\d+\.\d+\.\d+/)[0];
        alias.logger.info(ip, 'external ip: ');
        internalIp.v4().then(ip => {
          alias.logger.info(ip, 'internal ip: ');
        });
      }
      // alias.spinner('', true);
    });
  }
}

module.exports = IpCommand;
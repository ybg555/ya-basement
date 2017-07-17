/**
 * @author yongbigang
 * @date 2017/04/22
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
const urllib = require('urllib');

class OpenCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya yd <question>');
    this.options = {};
  }

  * run(props) {
    const args = props.argv;
    const a = args._[0] || '';

    /**
     * http://fanyi.youdao.com/openapi?path=data-mode
     */
    urllib.request('http://fanyi.youdao.com/openapi.do', {
      method: 'GET',
      data: {
        keyfrom: 'ya-basement',
        key: '1721554732',
        type: 'data',
        doctype: 'json',
        version: '1.1',
        q: a
      },
      dataType: 'json',
    }, (err, data, res) => {
      if (err) {
        console.log('[error] please try again!'.red);
      } else {
        const translation = data.translation ? data.translation.join(' / ') : false;
        const otherInfo = data.basic ? data.basic.explains.join(' / ') : false;
        if (translation) console.log('translation: '.green, translation);
        if (otherInfo) console.log('other: '.green, otherInfo);
      }
    });
  }

  get description() {
    return '有道翻译';
  }
}

module.exports = OpenCommand;
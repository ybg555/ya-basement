/**
 * @author bigang.ybg
 * @date 2018/01/28
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
const Benchmark = require('benchmark');
const vm = require('vm');
const fs = require('fs');

class BenchMarkCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya benchmark -a=js文件 -b=js文件');
    this.options = {
      a: {
        type: 'string',
        description: 'js文件a'
      },
      b: {
        type: 'string',
        description: 'js文件b'
      }
    };
  }

  get description() {
    return '2个 js 文件(代码)性能基准测试';
  }

  isFile(path) {
    return fs.existsSync(path) && fs.statSync(path).isFile();
  }

  * run(props) {
    const args = props.argv;
    const alias = this;

    if (this.isFile(args.a) && this.isFile(args.b)) {
      this.spinner('...');
      const suite = new Benchmark.Suite;
      const rule1 = fs.readFileSync(args.a).toString();
      const rule2 = fs.readFileSync(args.b).toString();

      suite.add('script-a', function() {
        vm.runInThisContext(rule1);
      })
      .add('script-b', function() {
        vm.runInThisContext(rule2);
      })
      .on('cycle', function(event) {
        alias.spinner(String(event.target), true);
      })
      .on('complete', function() {
        alias.logger.info('Faster is ' + this.filter('fastest').map('name'), '[result]');
      })
      .run({
        async: true
      });
    } else {
      alias.logger.error('格式错误，请参照：ya benchmark -a=js文件 -b=js文件');
    }
  }
}

module.exports = BenchMarkCommand;
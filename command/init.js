/**
 * @author yongbigang
 * @date 2017/07/16
 */

'use strict';

const BaseCommand = require('../lib/BaseCommand');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const download = require('download-git-repo');
const _ = require('../lib/utils');
const baseDir = path.resolve(__dirname, '..');
const config = baseDir + '/config/boilerplate.json';

class InitCommand extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    this.yargs.usage('Usage: ya init -d=path');
    this.options = {
      key: {
        alias: 'k',
        type: 'string',
        description: 'write config key'
      },
      value: {
        alias: 'v',
        type: 'string',
        description: 'write config value'
      },
      dir: {
        alias: 'd',
        type: 'string',
        description: 'init dest path'
      }
    };
  }

  get description() {
    return 'init boilerplate';
  }

  getTargetDirectory() {
    // todo force
    const force = this.args.force;
    const dir = this.args.dir || this.args._[0] || '';
    let targetDir = path.resolve(this.cwd, dir);
    const isValidDirectory = _.isValidDirectory(fs, targetDir, force, this.logger);
    if (!isValidDirectory) {
      targetDir = false;
    }
    return targetDir;
  }

  * run(props) {
    const args = this.args = props.argv;
    this.cwd = process.cwd();
    const alias = this;
    const key = args.key;
    const value = args.value;
    const dir = args.dir;
    const configJson = JSON.parse(fs.readFileSync(config));
    const configStr = JSON.stringify(configJson);
    const loggerMsg = {
      addConf: '新增配置: ya init -k=templateName -v=mygitlab.com:owner/name#branch or github:owner/name',
      useage: 'Usage: ya init -d=path'
    };
    /**
     * 获取参数
     * 产出地址合法
     * 取配置，选择
     * 下载(本地和远程)
     *  https://github.com/eggjs/egg-init/blob/master/lib/init_command.js
     *  https://www.npmjs.com/package/download-git-repo
     */
    if (key || value) {
      if (key && value) {
        const reg = /(gitlab|github)/;
        if (reg.test(value)) {
          fs.readFile(config, function(err, buffer) {
            if (err) throw err;

            let content = JSON.parse(buffer);
            content[ key ] = value;
            content = JSON.stringify(content);

            fs.writeFile(config, content, {
              encoding: 'utf8',
              mode: 777,
              flag: 'w'
            }, err => {
              if (err) throw err;
              alias.logger.info('config successful => ' + content);
              alias.backupConfig();
            });
          });
        } else {
          alias.logger.error('github or gitlab formatter error!');
        }
      } else {
        alias.logger.info(loggerMsg.addConf);
      }
    } else if (dir) {
      const targetDirectory = this.getTargetDirectory();
      if (targetDirectory) {
        // 产出路径合法
        let choices = [];

        if (Object.is(configStr, '{}')) {
          alias.logger.info(loggerMsg.addConf);
        } else {
          choices = _.jsonGetKeys(configJson);
          const questions = [{
            type: 'list',
            name: 'which',
            message: 'select boilerplate',
            choices,
            filter(val) {
              return val.toLowerCase();
            }
          }];
          const answers = yield inquirer.prompt(questions);

          const templateDir = configJson[ answers.which ];
          if (fs.existsSync(templateDir)) {
            copydir(templateDir, targetDirectory, function(err) {
              if (err) alias.logger.error(err, '[init error]');
              else alias.logger.info(`${templateDir} => ${targetDirectory} success!`, '[init local]');
            });
          } else {
            /**
             * 模板地址范例
             *  github:ybg555/ya-basement
             *  http://gitlab.alibaba-inc.com:aliplay/cube-boilerplate#master
             */
            download(templateDir, targetDirectory, {
              clone: true
            }, function(err) {
              if (err) alias.logger.error('Failed to download repo ' + templateDir + ': ' + err.message.trim());
              else alias.logger.info(`${templateDir} => ${targetDirectory} success!`, '[init remote]');
            });
          }
        }
      }
    } else {
      if (Object.is(configStr, '{}')) alias.logger.info(loggerMsg.addConf);
      else alias.logger.info(loggerMsg.useage);
    }
  }
}

module.exports = InitCommand;
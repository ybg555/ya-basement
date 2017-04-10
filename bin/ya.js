#!/usr/bin/env node --harmony

'use strict';

const fs = require('fs');
const path = require('path');
const program = require('commander');
const config = require('../config/open.json');
const _ = require('../lib/utils');

// const ipify = require('ipify'); 有点慢
const publicIp = require('public-ip');
const internalIp = require('internal-ip');

const colors = require('colors');
colors.setTheme({
  cool: 'rainbow',
  info: 'green',
  help: 'cyan',
  debug: 'blue',
  warn: 'yellow',
  err: 'red',
  bgRed: 'bgRed',
  rd: 'random'
});

program
  .version('1.0.0')
  // .option('-p, --path <dir>', 'path')

/**
 * config
 */
program.command('config <key> <value>')
  .description('write config')
  .alias('c')
  .action((a, b) => {
    if (!fs.existsSync(b)) return console.log(b.bgRed, 'is not exist!'.err);

    const baseDir = path.resolve(__dirname, '..');
    fs.readFile(baseDir + '/config/open.json', function(err, buffer){
      if (err) throw err;

      let content = JSON.parse(buffer);
      content[ a ] = b;
      content = JSON.stringify(content);

      fs.writeFile(baseDir + '/config/open.json', content, {
        encoding: 'utf8',
        mode: 777,
        flag: 'w'
      }, err => {
        if (err) throw err;
        console.log('config successful=>'.info, content);
      });
    });
  });

/**
 * open file or dir
 */
program.command('open <dir>')
  .description('open dir')
  .alias('o')
  .action((a, b) => {
    if(config[a]){
      _.openFile(config[ a ]);
      console.log('open'.rainbow, config[ a ].rainbow, 'successful!'.rainbow);
    }else{
      if (fs.existsSync(a)){
        _.openFile(a);
        console.log('open'.rainbow, a.rainbow, 'successful!'.rainbow);
      }else{
        console.log(a.bgRed, 'is not exist!'.err, 'please select next:'.err);
        console.log(config);
      }
    }
  });

/**
 * get internal & external ip
 */
program.command('ip')
  .description('get ip')
  .action((a) => {
    console.info('internal ip: '.cool, internalIp.v4());
    //ipify((err, ip) => {
    //  console.log('external ip: ', ip);
    //});

    publicIp.v4().then(ip => {
      console.log('external ip: '.cool, ip);
    });
  });

/**
 * default
 */
program.parse(process.argv);
if (!program.args.length) {
  program.help()
};
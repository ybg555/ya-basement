'use strict';

const path = require('path');
const fs = require('fs');
const copydir = require('copy-dir');
const homedir = require('homedir');
const TMP_DIR = path.resolve(homedir(), '.tinify-tmp');
const CONFIG_DIR = path.join(__dirname, '../config');

function backupConfig() {
  copydir(TMP_DIR, CONFIG_DIR, function(err) {
    if (err) {
      console.log('[syncConf-error]' + err);
    }
    console.log('[syncConf] success!');
  });
}

if (fs.existsSync(TMP_DIR)) {
  backupConfig();
}
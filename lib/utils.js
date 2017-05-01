'use strict';

const child_process = require('child_process');

module.exports = {
  openFile(dir) {
    child_process.exec('open ' + dir, [], function() {});
  }
};
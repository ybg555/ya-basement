'use strict';

const child_process = require('child_process');

module.exports = {
  // open
  openFile(dir) {
    child_process.exec('open ' + dir, [], function() {});
  },
  // init boilerplate
  jsonGetKeys(json) {
    const keys = [];
    for (const name in json) {
      if (json.hasOwnProperty(name)) {
        keys.push(name);
      }
    }
    return keys;
  },
  isValidDirectory(fs, dir, force, logger) {
    // exist
    if (fs.existsSync(dir)) {
      // not a directory
      if (!fs.statSync(dir).isDirectory()) {
        logger.error(`${dir} already exists as a file`);
        return false;
      }
      // check if directory empty
      const files = fs.readdirSync(dir).filter(name => name[ 0 ] !== '.');
      if (files.length > 0) {
        if (force) {
          logger.warn(`${dir} already exists and will be override due to --force`);
        } else {
          logger.error(`${dir} already exists and not empty: ${JSON.stringify(files)}`);
          return false;
        }
      }
    }
    return true;
  }
};
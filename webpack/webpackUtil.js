const path = require('path');
const glob = require('glob');

// 获取多入口文件
exports.getEntry = function(globPath) {
  let entries = {}, baseName;
  glob.sync(globPath).forEach(function(entry) {
      baseName = path.basename(entry, path.extname(entry));
      entries[baseName] = entry;
  });
  return entries;
}
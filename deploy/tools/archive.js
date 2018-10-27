require('shelljs/global')
// npm i archiver ora shelljs -D

var path = require('path')
var fs = require('fs');
var archiver = require('archiver');
var archiveFilePath = path.join(__dirname, '../../dist.zip');
var archive = archiver('zip');
var ora = require('ora')
const distDir = require('../../config').dir
console.log(distDir)

if (!process.env.NODE_ENV) {
  console.log('请指定打包的环境:NODE_EVN=production(生产环境)');
  return;
}

rm('-rf', archiveFilePath)

var spinner = ora('archiving for ' + process.env.NODE_ENV + '...');
spinner.start()

var output = fs.createWriteStream(archiveFilePath);

output.on('close', function () {
  spinner.stop()
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});


archive.pipe(output);

archive.directory('dist/'+distDir, true, {date: new Date()});

archive.finalize();

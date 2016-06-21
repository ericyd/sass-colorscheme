var path = require('path');
var fs = require('fs');
var sassTrue = require('sass-true');

var files = fs.readdirSync(__dirname);

for (var i = 0; i < files.length; i++) {
    if (path.extname(files[i]) == '.scss') {
        sassTrue.runSass({file: path.join(__dirname, files[i])}, describe, it);
    }
}
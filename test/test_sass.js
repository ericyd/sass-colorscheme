var path = require('path');
var sassTrue = require('sass-true');

var sassFile = path.join(__dirname, 'test-generate-mono.scss');
sassTrue.runSass({file: sassFile}, describe, it);

sassFile = path.join(__dirname, 'test-generate-complementary.scss');
sassTrue.runSass({file: sassFile}, describe, it);
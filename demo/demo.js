var hogan = require('hogan.js');
var fs = require('fs');
var path = require('path');

var schemes = ['mono', 'complementary', 'triad', 'tetrad', 'analogic'];
var schemesObj = [{'scheme':'mono'}, {'scheme':'complementary'}, {'scheme':'triad'}, {'scheme':'tetrad'}, {'scheme':'analogic'}];
var variants = ['--lighter', '--lightest', '--darker', '--darkest'];
var variantsObj = [{'variant': '--lighter'}, {'variant': '--lightest'}, {'variant': '--darker'}, {'variant': '--darkest'}, {'variant': ''}];
var keys = ['$primary', '$complementary', '$secondary-a', '$secondary-b'];
var keysObj = [{'key': '$primary'}, {'key': '$complementary'}, {'key': '$secondary-a'}, {'key': '$secondary-b'}];
var variations = ['pastel', 'soft', 'light', 'hard', 'pale', 'none'];
var index;
var partials = {};
var data;

fs.readdir(path.join(__dirname, 'templates'), function(err, files) {
    if (err) throw err;
    for (var i = 0; i < files.length; i++) {
        data = fs.readFileSync(path.join(__dirname, 'templates', files[i]));
        if (path.basename(files[i]) == 'index.hogan') {
            index = hogan.compile(data.toString());
        } else {
            partials[path.basename(files[i],'.hogan')] = hogan.compile(data.toString());
        }
    }
    fs.writeFile(path.join(__dirname, 'index.html'),
                index.render({'schemes': schemesObj, 'variation': 'none', 'keys': keysObj, 'variants': variantsObj}, partials),
                function(err) {if (err) throw err});
});
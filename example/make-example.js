var hogan = require('hogan.js');
var fs = require('fs');
var path = require('path');
var open = require('open');
var sass = require('node-sass');

var schemes = ['mono', 'complementary', 'triad', 'tetrad', 'analogic'];
var variants = ['--lightest', '--lighter', '', '--darker', '--darkest'];
var colors = ['primary', 'complementary', 'secondary-a', 'secondary-b'];
var variations = ['none', 'pastel', 'dark', 'light', 'hard', 'pale'];
var index;

// set seed color
if (process.argv[2]) {
    var re = /(?:.*'seed'\:)(.*)(?=,)/;
    var settings = fs.readFileSync(path.join(__dirname, 'defaults.scss')).toString();
    settings = settings.replace(settings.match(re)[1], process.argv[2]);
    fs.writeFileSync(path.join(__dirname, 'defaults.scss'), settings);
}

// compile sass
sass.render({
    file: path.join(__dirname, 'example.scss')
}, function(err, result) {
    if (err) throw err;
    fs.writeFile(path.join(__dirname, 'example.css'), result.css.toString(), function(err) {if (err) throw err;});
    generateDataArrays();
    compileIndex();
});


function generateDataArrays() {
    // fill arrays with values for hogan template
    schemes.forEach(function(value, index, arr) {arr[index] = {'scheme': value};});
    variants.forEach(function(value, index, arr) {arr[index] = {'variant': value};});
    colors.forEach(function(value, index, arr) {arr[index] = {'color': value};});
    variations.forEach(function(value, index, arr) {arr[index] = {'variation': value};});
}



// compile hogan template and open index.html
function compileIndex() {
    fs.readFile(path.join(__dirname, 'templates', 'index.hogan'), function(err, data) {
        if (err) throw err;
        // write rendered result to index.html
        fs.writeFile(path.join(__dirname, 'index.html'),
                    hogan.compile(data.toString()).render({
                        'schemes': schemes, 
                        'variations': variations, 
                        'colors': colors, 
                        'variants': variants,
                        }),
                    function(err) {if (err) throw err});
        
        // open index.html in browser
        open(path.join(__dirname, 'index.html'));
    });
}

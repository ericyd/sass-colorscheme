# Sass color scheme generator
Color scheme generator for Sass.  Based on http://colorschemedesigner.com/csd-3.5 and [color-scheme](https://www.npmjs.com/package/color-scheme), but unique in it's output and focus on ease of use.



## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev sass-colorscheme`



## Usage

Import the `scss` file from any other Sass file, 
and assign a variable to the function's output:

```sass
@import "node_modules/sass-colorscheme/colorscheme";
$seed-color: #ffd040;
$colorscheme: colorscheme($seed: $seed-color, $global: true, $scheme: 'mono');

h1 {
    color: $primary; // #ffd040
    background: $primary-lightest; // #ffefc0
    border: 1px solid $primary-darkest; // #c09000
}
```
Or, if variables are not global  

```sass
@import "node_modules/sass-colorscheme/colorscheme";
$seed-color: #ffd040;
$colorscheme: colorscheme($seed: $seed-color, $global: false, $scheme: 'mono');

h1 {
    color: map-get($colorscheme, '$primary'); // #ffd040
    background: map-get($colorscheme, '$primary-lightest'); // #ffefc0
    border: 1px solid map-get($colorscheme, '$primary-darkest'); // #c09000
}
```

Note that the keys used with `map-get` are _identical_ to the global variable names, including the leading `$`. 



## Syntax

#### colorscheme($seed[, $global][, $scheme][, $distance][, $variation][, $complement])

Returns a map of colors (see [Output](#output))

### $seed
Type: `color`

Color on which to base the color scheme.  Can be any hex or named color 
value. To use RGB or HSL values, use the built-in `rgb()` or `hsl()` functions.
    
### $global 
Type: `boolean` Default: `true` (Optional)

Assign color scheme output to global variables.  True results in 
variables that are set in the global namespace and can be 
accessed by any `sass` file that imports this script.  False 
results in no additional global variables.  To access the colors, 
you must use `map-get($colorscheme, '$key')`.
    
### $scheme 
Type: `string` Default: `mono` (Optional)

The color scheme to generate.  Accepted values are

* `mono` A monochromatic color scheme
* `triad` A color scheme with three main colors. 
The two secondary colors are adjacent to the complement of the `$seed` color
* `complementary` A color scheme based on the seed and it's complement
* `tetrad` A color scheme with four main colors.  Two colors are the 
seed and the complement, plus one value adjacent to the seed and one 
value adjacent to the complement.
* `analogic` A color scheme with three main colors. The two secondary 
colors are adjacent to the `$seed` color.  Can optionally include the 
complement (see `$complement`, below).

### $distance
Type: `number` Default: `0.3` Range: `0 - 1, inclusive` (Optional)

The distance separating the secondary values from the seed and complement.  
Notes:

* Only valid for `triad`, `tetrad`, and `analogic`.
* A larger number increases the amount of separation between 
colors, where 1 is maximum separation.  
* Used with `tetrad`, a distance of 1 will result in 4 evenly 
spaces hues around the color circle.  That is, each hue will 
be offset from the other by 90 degrees.  A distance of 0 will 
result in the same output as the `complementary` scheme.
* For `triad` and `analogic`, A distance of 1 will result in 
the same scheme: the seed, plus two colors that are evenly 
spaced between the seed and it's complement.
* For `triad`, a distance of 0 will result in the same scheme as `complementary`.
* For `analogic`, a distance of 0 will result in the same scheme as `mono`.
    
### $variation
Type: `string` Default: `none` (Optional)

Variations on the generated color scheme.  Accepted values are
    
* `pastel`
* `soft`
* `light`
* `hard`
* `pale`
* `none`

### $complement
Type: `boolean` Default: `false` (Optional)

Include the complement on the `analogic` color scheme.  Has no effect when 
used with other schemes. 


## Output

The script generates a minimum of 5 colors (when `$scheme == 'mono'`), 
and a maximum of 20 colors (when `$scheme == 'tetrad'` or `$scheme == 'analogic' and $complement == true`).
The base color variable names are

* `$primary`
* `$secondary-a`
* `$secondary-b`
* `$complementary`

The color variants are

* `{base}--lighter`
* `{base}--lightest`
* `{base}--darker`
* `{base}--darkest`

The output varies depending on the selected `$scheme`:

* `mono` returns `$primary` and all variants
* `complementary` returns `$primary` and `$complementary` and all variants 
* `triad` returns `$primary`, `$secondary-a`, and `$secondary-b` and all variants
* `tetrad` returns all four base colors and all variants
* `analogic` with `$complement == false` returns `$primary`, `$secondary-a`, and `$secondary-b` and all variants
* `analogic` with `$complement == true` returns all four base colors and all variants


## Generating example color schemes

The package has an `example` directory which is designed to make it easy to generate and preview various color schemes.

### Creating previews

Both the `example` script and the `start` script will generate a preview using the default settings.

```bash
npm start
# or
npm run example
```

To pass a custom seed color to the example script, simply pass a command line argument to npm (note that the color must be quoted):

```bash
npm start -- '#ff0000'
# or
npm run example -- '#ff0000'
```

Alternatively, you can modify the default seed color in `example/defaults.scss` and simply run `npm start` with no arguments.
const fs = require('fs');
const browserify = require( 'browserify' );

browserify( __dirname + '/assets/blocks.es6' )
	.transform( 'babelify', {presets: ['@babel/preset-env']} )
	.bundle()
	.pipe( fs.createWriteStream( __dirname + '/assets/blocks.js' ) );

browserify( __dirname + '/assets/caxton.es6' )
	.transform( 'babelify', {presets: ['@babel/preset-env']} )
	.bundle()
	.pipe( fs.createWriteStream( __dirname + '/assets/caxton.js' ) );

console.log( __dirname );
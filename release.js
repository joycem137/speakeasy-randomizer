var fs = require('fs-extra');
var webpack = require('webpack');
var React = require('react');

var OUTPUT_DIR = 'build';
var OUTPUT_JS = 'index.js';
var ASSET_DIR = 'assets';
var OUTPUT_HTML = 'index.html';

makeDirectories();
makeIndex();
copyAssets();

module.exports = {
    entry: ['./index.jsx'],

    output: {
        path: OUTPUT_DIR,
        publicPath: OUTPUT_DIR,
        filename: OUTPUT_JS
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};

function copyAssets() {
    fs.copy('./img', OUTPUT_DIR + '/' + ASSET_DIR + '/img', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("success!");
        }
    });
}

function makeIndex() {

    var outputDOM = React.DOM.html({},
        React.DOM.body({},
            React.DOM.div({ id: 'app' }),
            React.DOM.script({src: OUTPUT_JS})
        )
    );

    fs.writeFileSync(OUTPUT_DIR + '/' + OUTPUT_HTML, React.renderToStaticMarkup(outputDOM));
}

function makeDirectories() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    if(!fs.existsSync(OUTPUT_DIR + '/' + ASSET_DIR)) {
        fs.mkdirSync(OUTPUT_DIR + '/' + ASSET_DIR)        
    }
}
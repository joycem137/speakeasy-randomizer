var fs = require('fs-extra');
var webpack = require('webpack');
var React = require('react');

var OUTPUT_DIR = 'build';
var ASSET_DIR = 'assets';
var OUTPUT_JS = 'index.js';
var OUTPUT_HTML = 'index.html';

makeIndex();
copyAssets();

module.exports = {
    entry: ['./index.jsx'],

    output: {
        path: OUTPUT_DIR,
        publicPath: ASSET_DIR,
        filename: OUTPUT_JS
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },

    devServer: {
        contentBase: OUTPUT_DIR
    },

    resolve: {
        modulesDirectories: [
            'node_modules'
        ]
    }
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
            <!-- It is important that you point to the full url -->
            React.DOM.script({src: "http://localhost:8080/webpack-dev-server.js"}),
            React.DOM.script({src: '/' + ASSET_DIR + '/' + OUTPUT_JS})
        )
    );

    fs.writeFileSync(OUTPUT_DIR + '/' + OUTPUT_HTML, React.renderToStaticMarkup(outputDOM));
}
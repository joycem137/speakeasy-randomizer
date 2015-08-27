var fs = require('fs');
var webpack = require('webpack');
var React = require('react');

var OUTPUT_DIR = 'build';
var OUTPUT_JS = 'index.js';
var OUTPUT_HTML = 'index.html';

makeIndex();

module.exports = {
    entry: ['./index.jsx'],

    output: {
        path: OUTPUT_DIR,
        publicPath: OUTPUT_DIR,
        filename: OUTPUT_JS
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};

function makeIndex() {

    var outputDOM = React.DOM.html({},
        React.DOM.body({},
            React.DOM.div({ id: 'app' }),
            React.DOM.script({src: OUTPUT_JS})
        )
    );

    fs.writeFileSync(OUTPUT_DIR + '/' + OUTPUT_HTML, React.renderToStaticMarkup(outputDOM));
}
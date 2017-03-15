const webpack = require('webpack');
const path = require('path');

const SOURCE = path.resolve(__dirname);
const NODE_MODULES = SOURCE + '/node_modules';

const BUILD_DIR = path.resolve(__dirname, '../public/build/');

const cssLoaders = ['style', 'css', 'sass'];

const config = {
    entry: SOURCE + '/app/app.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SOURCE,
                loader: 'babel'
            },
            {
                test: /\.s?css$/,
                loaders: cssLoaders,
                include: SOURCE
            },
        ]
    },
    resolve: {
        alias: {},
        modulesDirectories: [SOURCE, NODE_MODULES],
        extensions: ['', '.js', '.json', '.svg', '.scss'],
    },
};

module.exports = config;
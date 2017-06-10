const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'sourcemap',
    entry: './src/index.js',
    target: 'node',
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};
var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.join(__dirname, 'src');

module.exports = {
    entry: ['./src/index.tsx'],
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: SRC_DIR
        }]
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'build')
    },
    devtool: 'source-map',
    plugins: [
    ],
    resolve: {
        modules: [
            SRC_DIR,
            "node_modules"
        ],
        extensions: ['.jsx', '.js', '.tsx', '.ts']
    },
    devServer: {
        host: '0.0.0.0'
    }
};
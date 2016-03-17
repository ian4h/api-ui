/**
 * Created by ian on 07/03/16.
 */
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

console.log("*********************************************************************************************")
console.log("Webpack debug = " + debug)
console.log("*********************************************************************************************")

module.exports = {
    entry: "./src/index.js",
    devtool: debug ? "inline-sourcemap" : null,
    output: {
        path: "./src/js",
        filename: "client.min.js"
    },
    devServer: {
        inline: true,
        port: 3000,
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: debug ? ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'] :
                        ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy',
                            new webpack.optimize.UglifyJsPlugin({minimize: true})]
                }
            }
        ]
    }
};
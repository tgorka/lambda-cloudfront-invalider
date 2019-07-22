import * as path from 'path';
import * as webpack from 'webpack';
import * as serverlessWebpack from 'serverless-webpack';
import * as nodeExternals from 'webpack-node-externals';


const config: webpack.Configuration = {
    mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
    entry: './.build/index.js', //'./index.ts', //'./.build/handler.js',//serverlessWebpack.lib.entries,
    optimization: {
        minimize: true
    },
    performance: {
        hints: false
    },
    externals: [ nodeExternals() ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    target: 'node',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/g,
            use: ["source-map-loader"],
            enforce: "pre"
        }]
    }
};

module.exports = config;

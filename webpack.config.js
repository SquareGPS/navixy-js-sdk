const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    output: {
        filename: 'navixy-sdk.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'navixy',
        libraryTarget: 'var'
    }
};
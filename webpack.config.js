const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const DEV_PORT = process.env.PORT || 8080;

module.exports = {
    entry: './server/index.ts',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: "tsconfig.server.json",
                        }
                    }
                ]

            }
        ],
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale$/)
    ],
    resolve: {
        extensions: [
            '.js', '.ts'
        ]
    },
    output: {
        // path: path.resolve(__dirname, 'build/'),
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'build/'),
    //     port: DEV_PORT,
    //     hot: true,
    // },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin(),
    //     new CopyPlugin([{ from: './public', to: '.' }]),
    // ],
};
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;


module.exports = {
    mode: 'development', // 1
    entry: './src/index.js', // 2
    output: { // 3
        filename: 'bundle.[hash].js' // 4
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        })
    ],
    module: {
        rules: [
            { // 1
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            { // 2
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        host: 'localhost',
        port: port,
        open: true,
    },
};
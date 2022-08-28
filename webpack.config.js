const {VueLoaderPlugin}  =require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader:'resolve-url-loader',
                        options: {     removeCR: true   }
                    },
                    {
                        loader:'sass-loader',
                        options: {sourceMap: true}
                    },
                ],
            },
            {   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: ['url-loader?limit=100000']
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './public/index.html',
            filename: 'index.html'
          })
    ]
};
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const SERVER_URL = {
    production: JSON.stringify('https://eq-works-sample.herokuapp.com'),
    development: JSON.stringify('http://localhost:5555')
}

// check environment mode
var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$|jsx/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}, {
				test: /\.html$/,
				use: ['html-loader']
			}, {
				test: /\.css$/,
				use:['style-loader','css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            }
		]
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),

		new webpack.DefinePlugin({
            'SERVER_URL': SERVER_URL[environment]
        })
    ],
    resolve: {
		alias: {
            components: path.resolve(__dirname, 'src/js/components'),
			css: path.resolve(__dirname, 'src/css/'),
			img: path.resolve(__dirname, 'src/img/'),
		}
	}
};
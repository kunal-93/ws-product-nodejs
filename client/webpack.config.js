const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

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
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		})
    ],
    resolve: {
		alias: {
            components: path.resolve(__dirname, 'src/js/components'),
			css: path.resolve(__dirname, 'src/css/'),
			img: path.resolve(__dirname, 'src/img/'),
		}
	},
	externals: {
		'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? {
			serverUrl: "https://eq-works-sample.herokuapp.com"
		} : {
			serverUrl: "http://localhost:5555"
		})
	}
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './docs'
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Weelil Site',
      template: './src/index.html',
      inject: 'body'
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ]
      }
    ]
  }
};
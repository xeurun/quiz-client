
/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require('path');

const isProd = false;

module.exports = {
  mode: isProd ? "production" : "development",
  entry: [
    "./src/app.js",
    "./src/app.scss"
  ],
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([ 'css-loader', 'sass-loader' ])
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
          test: /\.(svg|woff|woff2|eot|ttf)$/,
          use: 'file-loader?outputPath=fonts/'
      },
      {
          test: /\.html$/,
          use: 'html-loader'
      }
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: path.resolve(__dirname, 'index.html'),
          template: path.resolve(__dirname, 'src/app.html'),
          inject: false
      }),
      new ExtractTextPlugin("main.css"),
      new CopyWebpackPlugin([
        {from: 'node_modules/intro.js/minified/intro.min.js', to: path.resolve(__dirname, 'assets')},
		    {from: 'node_modules/angular-intro.js/build/angular-intro.min.js', to: path.resolve(__dirname, 'assets')}
      ])
  ],
  devServer: {
    host: "0.0.0.0",
    port: 4201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    contentBase: path.resolve(__dirname),
    compress: true,
    hot: true,
    publicPath: '/',
    watchContentBase: true,
    watchOptions: {
      poll: true
    }
  },
  watch: true,
  watchOptions: {
    ignored: ['node_modules'],
    aggregateTimeout: 300,
    poll: 1000
  }
};

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require('path');

const watchOptions = {
  ignored: /node_modules/,
  aggregateTimeout: 300,
  poll: true
};

module.exports = (env, argv) => {
  return {
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: 'main.js',
      chunkFilename: '[name].bundle.js',
      publicPath: 'assets'
    },
    resolve: {
      extensions: ['.js'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src')
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'ng-annotate-loader?ngAnnotate=ng-annotate-patched'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
            'sass-loader',
          ],
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
        template: path.resolve(__dirname, 'src/app.ejs'),
        base: argv.mode !== 'production' ? '/' : '/quiz-client/',
        inject: false
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyWebpackPlugin({
         patterns: [
          { from: 'node_modules/intro.js/minified/intro.min.js', to: path.resolve(__dirname, 'assets') },
          { from: 'node_modules/angular-intro.js/build/angular-intro.min.js', to: path.resolve(__dirname, 'assets') }
        ]
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devServer: {
      host: "0.0.0.0",
      port: process.env.NODE_PORT,
      https: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      contentBase: path.resolve(__dirname),
      compress: true,
      hot: true,
      overlay: true,
      disableHostCheck: true,
      watchContentBase: true,
      watchOptions: watchOptions,
    },
    watch: argv.mode !== 'production',
    watchOptions: watchOptions,
  };
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  mode: 'development',
  entry: [
    '@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js',
    'webpack-hot-middleware/client?reload=true&overlay=true'
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            encoding: 'base64'
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(CURRENT_WORKING_DIR, 'client/public/index.html')
    })
  ],
  devServer: {
    port: 6000,
    hot: true,
    open: true,
    inline: true,
    compress: true,
    noInfo: true,
    historyApiFallback: true,
    disableHostCheck: false,
    proxy: {
      '/api': 'http://localhost:9000'
    }
  },
  devtool: 'inline-source-map'
};

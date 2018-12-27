/**
 * This script is a webpack development configuration.
 *
 * @author @andy
 **/

const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');
const settings = require('./settings');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        APP_ENV: JSON.stringify('development'),
        SETTINGS: JSON.stringify(settings.development),
      },
    }),
    new HotModuleReplacementPlugin(),
    // new HardSourceWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
});

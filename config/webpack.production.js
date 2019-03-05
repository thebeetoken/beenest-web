/**
 * This script is a webpack production configuration.
 *
 * @author @andy
 **/

const path = require('path');
const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');
const settings = require('./settings');

const root = path.resolve(__dirname, '..', 'src');
const favicon = `${root}/assets/favicon.ico`;

const commonHtmlWebpackOpts = {
  favicon,
  inject: 'body',
  cache: true,
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
  },
};
module.exports = merge(common, {
  mode: 'production',
  output: {
    chunkFilename: 'js/[name].[chunkhash:6].js',
    filename: 'js/[name].[chunkhash:6].js',
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: process.cwd(),
      verbose: true,
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify('production'),
        SETTINGS: JSON.stringify(settings.production),
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${root}/templates/index.html`,
      excludeChunks: ['admin', 'legacy'],
      ...commonHtmlWebpackOpts,
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: `${root}/templates/admin.html`,
      excludeChunks: ['index', 'legacy'],
      ...commonHtmlWebpackOpts,
    }),
    new HtmlWebpackPlugin({
      filename: 'legacy.html',
      template: `${root}/templates/legacy.html`,
      excludeChunks: ['index', 'admin'],
      ...commonHtmlWebpackOpts,
    }),
    // new BundleAnalyzerPlugin(),
  ],
});

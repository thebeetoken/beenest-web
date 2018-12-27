/**
 * This script is a webpack staging configuration.
 *
 * @author @andy
 **/

const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const production = require('./webpack.production');
const settings = require('./settings');

module.exports = merge(
  {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          APP_ENV: JSON.stringify('staging'),
          SETTINGS: JSON.stringify(settings.staging),
        },
      }),
    ],
  },
  production
);
/**
 * This script runs the server which serves the app
 *
 * Local development / staging / production is served
 * through this script.
 *
 * @author @tommy, @andy, @kevin
 **/

const express = require('express');
const httpLogger = require('morgan');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
const PORT = 4200;

app.use(httpLogger('combined'));
const isDevelopmentNodeEnv = process.env.NODE_ENV === 'development';
if (isDevelopmentNodeEnv) {
  const webpack = require('webpack');
  const opn = require('opn');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackDevConfig = require('../config/webpack.development');
  const compiler = webpack(webpackDevConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      historyApiFallback: false,
      hot: true,
      index: false,
      publicPath: '/',
      serverSideRender: true,
      stats: { colors: true },
    })
  );
  opn(`http://localhost:${PORT}/`);
  app.use('/admin', (req, res) => res.sendFile('templates/admin.development.html', { root: __dirname }));
  app.use((req, res) => res.sendFile('templates/index.development.html', { root: __dirname }));
} else {
  app.use('/js', serveStatic(path.join(__dirname, '..', 'dist', 'js')));
  app.use('/admin', serveStatic(path.join(__dirname, '..', 'dist', 'admin.html')));
  app.use((req, res) => res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html')));
}

app.listen(PORT, () =>
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'} App is listening to http://localhost:${PORT}`)
);

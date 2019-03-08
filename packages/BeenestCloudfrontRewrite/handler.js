'use strict';

const url = require('url');
const path = require('path');

function getS3HtmlPath(path) {
  if (path.match(/\.(js|css|svg|png|jpg|jpeg|gif|map|ttf|ico)$/)) {
    return path;
  }

  if (path.startsWith('/admin')) {
    return '/admin.html';
  }

  if (path.startsWith('/legacy')) {
    return '/legacy.html';
  }

  return path;
}

module.exports.rewriteUrl = (event, context, callback) => {
  const request = event.Records[0].cf.request;

  request.uri = getS3HtmlPath(request.uri);

  callback(null, request);
};


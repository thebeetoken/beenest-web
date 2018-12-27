const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const handler = require('./handler');
const readFileAsync = promisify(fs.readFile); // (A)
const testFile = path.join(__dirname, 'test/request.json');

describe('handler', () => {
	test('rewrite url', () => {
        return readFileAsync(testFile, {encoding: 'utf8'})
          .then((text) => {
            const event = JSON.parse(text);
            handler.rewriteUrl(event, {}, (err, response) => {
              console.log(response);
            });
          });
	});
});

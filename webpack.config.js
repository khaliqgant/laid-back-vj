'use strict';

const path = require('path');

const fe = 'public/js';

module.exports = {
  entry: `./${fe}/app`,

  output: {
    path: path.resolve(__dirname, `${fe}/dist`),

    filename: 'app.js',
  },
};

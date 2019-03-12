const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');

module.exports = withTypescript(
  withImages(
    withLess({
      target: 'serverless',
      cssModules: true,
    })
  )
);

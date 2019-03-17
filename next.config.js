const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withWorkers = require('@zeit/next-workers');

module.exports = withTypescript(
  withWorkers(
    withImages(
      withLess({
        target: 'serverless',
        cssModules: true,
      })
    )
  )
);

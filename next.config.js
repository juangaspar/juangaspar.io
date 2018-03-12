const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');
const dist = '.next';

module.exports = {
  webpack: config => {
    config.plugins.push(
      new GenerateSW({
        exclude: ['*'],
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true,
        importWorkboxFrom: 'cdn',
        runtimeCaching: [
          {
            // Match any same-origin request that contains 'api'.
            urlPattern: /.*/,
            // Apply a network-first strategy.
            handler: 'networkFirst'
          }
        ]
      })
    );

    return config;
  }
};

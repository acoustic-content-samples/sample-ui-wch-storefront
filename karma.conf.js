var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        // System.js for module loading
        'node_modules/systemjs/dist/system.src.js',

        // Polyfills
        'node_modules/core-js/client/shim.js',
        'node_modules/babel-polyfill/dist/polyfill.js',

        // zone.js
        'node_modules/zone.js/dist/zone.js',
        'node_modules/zone.js/dist/long-stack-trace-zone.js',
        'node_modules/zone.js/dist/proxy.js',
        'node_modules/zone.js/dist/sync-test.js',
        'node_modules/zone.js/dist/jasmine-patch.js',
        'node_modules/zone.js/dist/async-test.js',
        'node_modules/zone.js/dist/fake-async-test.js',

        // actual tests
        'src/**/*.spec.ts'
      
    ],
    exclude: [
    ],
    preprocessors: {
      'src/**/*.ts': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}

/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { join } = require('path');

const defaults = require('lodash/defaultsDeep');
const webpack = require('webpack');

const pkg = require(join(process.cwd(), 'package.json'));
const dllPlugin = require('../config').dllPlugin;

if (!pkg.dllPlugin) {
  process.exit(0);
}

const dllConfig = defaults(pkg.dllPlugin, dllPlugin.defaults);
const outputPath = join(process.cwd(), dllConfig.path);

module.exports = require('./webpack.base.babel')({
  context: process.cwd(),
  entry: dllConfig.dlls ? dllConfig.dlls : dllPlugin.entry(pkg),
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }), // eslint-disable-line no-new
  ],
  performance: {
    hints: false,
  },
});

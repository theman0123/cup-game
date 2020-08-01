const merge = require('webpack-merge');
const path = require('path');
const base = require('./base');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.min.js',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});

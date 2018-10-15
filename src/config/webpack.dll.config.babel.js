import 'config/environment';
import 'helpers/cleanAssetJson';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import path from 'path';

// Load dependencies
import { dependencies } from 'config/config';
import { DLL_LIB, ROOT } from 'config/paths';

const outputPath = DLL_LIB;
const fileName = '[name]_[chunkhash].js';

const plugins = [
  new CleanPlugin(['src/dll'], {
    root: ROOT,
  }),
  new webpack.DllPlugin({
    path: path.join(outputPath, 'manifest.json'),
    name: '[name]_[chunkhash]',
    context: __dirname,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
    },
  }),
];

export default {
  devtool: false,
  entry: {
    lib: dependencies.defaults,
  },
  output: {
    path: outputPath,
    filename: fileName,
    library: '[name]_[chunkhash]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins,
};

import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import { ASSET_FILE } from 'config/paths';

export default {

  webpack_assets_file_path: ASSET_FILE,

  assets: {
    images: {
      extensions: [
        'jpeg', 'jpg', 'png', 'gif', 'svg',
      ],
    },
    fonts: {
      extensions: [
        'woff', 'ttf', 'woff2', 'eot',
      ],
    },
    style_modules:
    {
      extensions: ['scss'],
      // which `module`s to parse CSS style class name maps from:
      filter: (module, regex, options, log) => {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // which outputs `module`s with `module.name == asset_path`,
          // but those `module`s do not contain CSS text.
          //
          // The `module`s containing CSS text are
          // the ones loaded with Webpack "css-loader".
          // (which have kinda weird `module.name`)
          //
          // Therefore using a non-default `filter` function here.
          //
          return IsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }

        // In production mode there's no Webpack "style-loader",
        // so `module.name`s of the `module`s created by Webpack "css-loader"
        // (those which contain CSS text)
        // will be simply equal to the correct asset path
        if (module.name.indexOf('multi ') < 0) {
          return regex.test(module.name);
        }
      },

      // How to correctly transform `module.name`s
      // into correct asset paths
      path: (module, options, log) => {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // so `module.name`s of the `module`s created by Webpack "css-loader"
          // (those picked by the `filter` function above)
          // will be kinda weird, and this path extractor extracts
          // the correct asset paths from these kinda weird `module.name`s
          return IsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }

        // in production mode there's no Webpack "style-loader",
        // so `module.name`s will be equal to correct asset paths
        return module.name;
      },

      // How to extract these Webpack `module`s' javascript `source` code.
      // Basically takes `module.source` and modifies its `module.exports` a little.
      parser: (module, options, log) => {
        if (options.development) {
          // In development mode it adds an extra `_style` entry
          // to the CSS style class name map, containing the CSS text
          return IsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }

        // In production mode there's Webpack Extract Text Plugin
        // which extracts all CSS text away, so there's
        // only CSS style class name map left.
        return module.source;
      },
    },
  },

};

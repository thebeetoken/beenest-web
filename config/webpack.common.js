/**
 * This script is a global webpack configuration before merging with
 * development/staging/production configs.
 *
 * @author @andy
 **/

const path = require('path');
const { ContextReplacementPlugin, NamedChunksPlugin } = require('webpack');

const root = path.resolve(__dirname, '..', 'src');
const chunkNameRegex = new RegExp(`${root}/components`);
const nodeModules = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
  entry: {
    index: `${root}/index.tsx`,
    rebrand: `${root}/rebrand.tsx`,
    admin: `${root}/admin.tsx`,
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'graphql-tag',
      'react-apollo',
      'apollo-client',
      'apollo-link',
      'apollo-link-context',
      'apollo-link-http',
      'apollo-link-state',
      'apollo-cache-inmemory',
      'styled-components',
      'raven-js',
      'firebase/app',
      'firebase/auth',
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    pathinfo: false,
    publicPath: '/',
  },
  resolve: {
    alias: {
      ABIs: `${root}/ABIs`,
      assets: `${root}/assets`,
      components: `${root}/components`,
      configs: `${root}/configs`,
      routes: `${root}/components/routes`,
      shared: `${root}/components/shared`,
      HOCs: `${root}/HOCs`,
      networking: `${root}/networking`,
      styled: `${root}/styled`,
      utils: `${root}/utils`,
    },
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.json'],
    modules: [root, nodeModules],
    symlinks: false,
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          minChunks: 2,
          minSize: 1,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ts|tsx)$/,
        include: /src/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test:/\.(s*)css$/,
        // include: /src/,
        // exclude: /node_modules/,
        use:['style-loader','css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        include: /assets/,
        exclude: /node_modules/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(jpg|jpeg|gif|png|eot|woff|ttf)$/,
        include: /assets/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name() {
              return process.env.NODE_ENV === 'production' ? 'assets/beenest-[name]-[hash:5].[ext]' : '[name].[ext]';
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /en/ // <-- specify only the locales you want to keep
    ),
    new NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      for (const m of chunk._modules) {
        if (chunkNameRegex.test(m.context)) {
          return path.basename(m.context);
        }
      }
      return null;
    }),
  ],
};

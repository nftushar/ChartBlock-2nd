const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = () => argv.mode === 'development';

  return {
    entry: {
      editor: './src/editor.js',
      script: './src/script.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    },

    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!editor.asset.php', '!script.asset.php'],
      }),
      new MiniCssExtractPlugin({
        chunkFilename: '[id].css',
        filename: (chunkData) => (chunkData.chunk.name === 'script' ? 'style.css' : '[name].css'),
      }),
      new ESLintPlugin(),
    ],

    devtool: isDev() ? 'cheap-module-source-map' : 'source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { development: isDev() }],
              ],
            },
          },
        },

        {
          test: /\.(s[ac]|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer()],
                },
              },
            },
            'sass-loader',
          ],
        },

        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },

        // Rule for handling 'faker' module 
        {
          test: /\/node_modules\/faker\//,
          resolve: {
            alias: {
              faker: path.resolve(__dirname, 'node_modules/faker'),
            },
          },
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },


      ],
    },

    externals: {
      '@wordpress/blob': ['wp', 'blob'],
      '@wordpress/block-editor': ['wp', 'blockEditor'],
      '@wordpress/blocks': ['wp', 'blocks'],
      '@wordpress/components': ['wp', 'components'],
      '@wordpress/compose': ['wp', 'compose'],
      '@wordpress/data': ['wp', 'data'],
      '@wordpress/element': ['wp', 'element'],
      '@wordpress/html-entities': ['wp', 'htmlEntities'],
      '@wordpress/i18n': ['wp', 'i18n'],
      '@wordpress/rich-text': ['wp', 'richText'],
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
};

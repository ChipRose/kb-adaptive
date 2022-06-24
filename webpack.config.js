const path = require('path');

//Plugins
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const OptimizeSccAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function optimization() {
  let configObj = [];

  if (isProd) {
    configObj = [
      new TerserWebpackPlugin({

      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
      new OptimizeSccAssetsWebpackPlugin(),
      new HtmlMinimizerPlugin(),
    ];
  }

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'source/fonts'), to: 'fonts' },
        { from: path.resolve(__dirname, 'source/favicon.ico'), to: 'favicon.ico' },
        { from: path.resolve(__dirname, 'source/img'), to: 'img' },
      ],
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, 'source/index.html'),
      filename: 'index.html',
    }),
  ];

  return basePlugins;
};

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',

  entry: './js/main.js',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },

  devtool: isProd ? false : 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    open: true,
    compress: true,
    port: 3000,
  },

  optimization: {
    minimize: isProd,
    minimizer: optimization(),
  },
  plugins: plugins(),

  module: {
    rules: [
      //Images
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        type: 'asset',
      },
      {
        //JS
        test: /\.js$/i,
        exclude: '/node_modules/',
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        //Styles
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, url: false } },
        ],
      },
    ],
  },
};

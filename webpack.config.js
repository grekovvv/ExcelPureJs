
const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Можем создавать вариативность добавления модулей
const jsLoaders = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};


const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'), // указываем за какой папкой будет следить WebPack
  mode: 'development', //
  entry: './index.js', // файл, с которого начинается приложение
  output: { // обозначаем, где будет храниться бандл
    filename: filename('js'), // Хеш помогает избежать кэширования со стороны браузера.
    // Без хеша браузер будет подтягивать банл из кеша, так как у файла такое же название
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // помогает не писать большие относительные пути, а ограничаться маленькими
    },
  },
  devtool: isDev ? 'source-map' : false, // добавляет оригинальные исходники .чтобы было проще работать
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // Вставляем каждый раз с в нужный html bundle с нужным хешем
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // hot reload
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders,
      },
    ],
  },
};

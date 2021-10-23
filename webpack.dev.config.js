/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    hot: true,
    contentBase: 'webpack/public/',
  },
  watch: true,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [/src/, /assets/],
        exclude: /node_modules\/(?!(frontend-common|file-uploader)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /fahrzeugbrief\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'assets/images/[name]_[hash:5].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'assets/sounds/[name]_[hash:5].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /src/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/fonts/[name].[ext]' },
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
  },
  resolve: {
    alias: {
      'react-dom': path.resolve(
        __dirname,
        './node_modules/@hot-loader/react-dom'
      ),
      react: path.resolve(__dirname, './node_modules/react'),
    },
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.scss'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./build/*'],
    }),
    new HtmlWebpackPlugin({
      title: 'ambisonics_decoder',
      template: './index.html',
      filename: 'index.html',
    }),
  ],
}

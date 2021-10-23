/* eslint-disable */
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          mangle: true,
          output: {
            comments: false,
          },
        },
        sourceMap: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: `assets/images/[name]_[hash:5].[ext]`,
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
              sourceMap: true,
              modules: {
                localIdentName: `[name]__[local]--[hash:base64:5]`,
              },
              importLoaders: 2,
            },
          },
          'postcss-loader',
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
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: `assets/sounds/[name]_[hash:5].[ext]`,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
    },
    modules: ['node_modules', './src/common'],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.scss'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./build/*'],
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
}
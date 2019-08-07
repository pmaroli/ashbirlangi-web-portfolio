const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require('fs');

const htmlFiles = fs.readdirSync('./src').filter(filename => {
  return filename.endsWith('.html')
})

module.exports = {
  mode: 'production',

  entry: './src/js/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[contentHash].js'
  },

  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ]
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[contentHash].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'video/'
            }
          },
        ],
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    // Add all the HTML files
    ...htmlFiles.map(filename => {
      return new HtmlWebpackPlugin({
        template: `./src/${filename}`,
        filename: `${filename}`,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    }),
  ],
}
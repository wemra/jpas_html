const webpack = require('webpack') //to access built-in plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'inline-source-map',
  // devServer: {
  //     historyApiFallback: true,
  //     compress: true,
  //     publicPath: '/asset/bundle/',
  //     host: "0.0.0.0",
  //     port: 3000,
  //     proxy: {
  //         "**": "http://localhost:8080"
  //     }
  // },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  optimization: {
    minimizer: [
        // new UglifyJSPlugin(),
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          }
        }),
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new WriteFilePlugin(),
    new webpack.NamedModulesPlugin({}),
    new MiniCssExtractPlugin({filename: 'bundle.css'}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
     'process.env': {
      'NODE_ENV': 'production'
      }
    }),
    new CopyPlugin([
      { from: 'src/html', to: '../' },
      { from: 'src/asset', to: '../asset' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './img/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          //name: './fonts/[name].[hash].[ext]'
          name: './fonts/[name].[ext]'
        }
      }
    ]
  },
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/bundle'
  }

}
